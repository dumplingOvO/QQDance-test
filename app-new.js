// 全局变量
let currentQuestion = 0;
let answers = [];

// 开始测试
function startTest() {
    console.log('开始测试函数被调用');
    document.getElementById('intro').style.display = 'none';
    document.getElementById('question').style.display = 'block';
    showQuestion(0);
}

// 显示问题
function showQuestion(index) {
    const question = questions[index];
    
    // 更新进度条
    const progress = ((index + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // 更新问题编号
    document.getElementById('questionNumber').textContent = `第 ${index + 1} 题 / 共 ${questions.length} 题`;
    document.getElementById('pageIndicator').textContent = `${index + 1} / ${questions.length}`;
    
    // 显示问题文本
    document.getElementById('questionText').textContent = question.text;
    
    // 每隔5题显示一句情怀语句
    if ((index + 1) % 5 === 0) {
        const phrase = nostalgicPhrases[Math.floor(Math.random() * nostalgicPhrases.length)];
        showNostalgicToast(phrase);
    }
    
    // 显示选项
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => selectOption(index, i, option.trait);
        
        // 如果已经选择过,标记选中状态
        if (answers[index] === option.trait) {
            button.style.borderColor = '#667eea';
            button.style.background = 'rgba(102, 126, 234, 0.1)';
        }
        
        optionsContainer.appendChild(button);
    });
    
    // 更新导航按钮状态
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = answers[index] === undefined;
    
    currentQuestion = index;
}

// 显示情怀语句提示
function showNostalgicToast(message) {
    const toast = document.createElement('div');
    toast.innerHTML = `<span style="margin-right:8px;">★</span> ${message}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ff00ff 0%, #ff69b4 100%);
        color: #ffff00;
        padding: 18px 35px;
        border: 4px solid #00ffff;
        border-style: outset;
        box-shadow: 
            0 0 30px rgba(255, 0, 255, 0.8),
            inset 2px 2px 0 rgba(255, 255, 255, 0.5);
        z-index: 1000;
        font-size: 1.1em;
        font-weight: bold;
        animation: fadeInUp 0.5s ease, fadeOutDown 0.5s ease 2.5s forwards;
        max-width: 90%;
        text-align: center;
        line-height: 1.6;
        text-shadow: 2px 2px 0 #000;
        font-family: 'Courier New', monospace;
    `;
    
    document.body.appendChild(toast);
    
    // 3秒后移除
    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// 选择选项
function selectOption(questionIndex, optionIndex, trait) {
    answers[questionIndex] = trait;
    
    // 更新选项按钮样式
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
        if (i === optionIndex) {
            btn.style.borderColor = '#ffff00';
            btn.style.background = 'linear-gradient(135deg, #ff00ff 0%, #ff69b4 50%, #ff00ff 100%)';
            btn.style.color = '#ffff00';
        } else {
            btn.style.borderColor = '#ff00ff';
            btn.style.background = 'linear-gradient(135deg, #000 0%, #1a1a1a 50%, #000 100%)';
            btn.style.color = '#00ffff';
        }
    });
    
    // 启用下一题按钮
    document.getElementById('nextBtn').disabled = false;
    
    // 自动进入下一题或提交测试(延迟300ms)
    setTimeout(() => {
        if (questionIndex < questions.length - 1) {
            showQuestion(questionIndex + 1);
        } else {
            // 最后一题选择后直接提交测试
            submitTest();
        }
    }, 300);
}

// 上一题
function prevQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

// 下一题
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        // 最后一题,提交测试
        submitTest();
    }
}

// 提交测试
function submitTest() {
    // 显示加载页面
    document.getElementById('question').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    
    // 模拟分析过程(1.5秒)
    setTimeout(() => {
        calculateResult();
    }, 1500);
}

// 计算结果
function calculateResult() {
    // 统计各维度得分
    let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;
    
    answers.forEach(answer => {
        switch(answer) {
            case 'E': E++; break;
            case 'I': I++; break;
            case 'S': S++; break;
            case 'N': N++; break;
            case 'T': T++; break;
            case 'F': F++; break;
            case 'J': J++; break;
            case 'P': P++; break;
        }
    });
    
    // 确定人格类型
    const type = 
        (E > I ? 'E' : 'I') +
        (S > N ? 'S' : 'N') +
        (T > F ? 'T' : 'F') +
        (J > P ? 'J' : 'P');
    
    // 显示结果
    showResult(type);
}

// 显示结果
function showResult(type) {
    const personality = personalityTypes[type];
    
    // 隐藏加载页面
    document.getElementById('loading').style.display = 'none';
    
    // 显示结果页面
    document.getElementById('result').style.display = 'block';
    
    // 填充结果数据
    document.getElementById('resultType').textContent = type;
    document.getElementById('resultName').textContent = personality.name;
    document.getElementById('resultDesc').textContent = personality.desc;
    
    // 显示特质标签
    const traitsContainer = document.getElementById('resultTraits');
    traitsContainer.innerHTML = '';
    
    personality.traits.forEach(trait => {
        const tag = document.createElement('span');
        tag.className = 'trait-tag';
        tag.textContent = '★ ' + trait + ' ★';
        traitsContainer.appendChild(tag);
    });
    
    // 显示详细分析
    showDetailedAnalysis(personality);
    
    // 生成并显示配图
    generatePersonalityImage(type, personality);
}

// 显示详细分析
function showDetailedAnalysis(personality) {
    const resultSection = document.getElementById('result');
    
    const oldAnalysis = document.getElementById('detailedAnalysis');
    if (oldAnalysis) {
        oldAnalysis.remove();
    }
    
    const analysisContainer = document.createElement('div');
    analysisContainer.id = 'detailedAnalysis';
    analysisContainer.style.cssText = `
        margin-top: 30px;
        padding: 25px;
        background: rgba(0, 0, 0, 0.8);
        border: 4px solid #ff00ff;
        border-style: double;
        text-align: left;
        box-shadow: inset 0 0 20px rgba(255, 0, 255, 0.3);
    `;
    
    const analysisTitle = document.createElement('h3');
    analysisTitle.textContent = '★ 人格深度解析 ★';
    analysisTitle.style.cssText = `
        color: #ffff00;
        font-size: 1.5em;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;
        text-shadow: 3px 3px 0 #ff00ff, 0 0 15px #ffff00;
        font-family: 'Courier New', monospace;
    `;
    analysisContainer.appendChild(analysisTitle);
    
    personality.analysis.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = `
            background: linear-gradient(135deg, #1a1a1a 0%, #000 100%);
            padding: 15px 20px;
            border: 3px solid #00ffff;
            border-style: outset;
            margin-bottom: 12px;
            box-shadow: inset 2px 2px 0 rgba(255, 255, 255, 0.1);
        `;
        itemDiv.innerHTML = `<span style="color: #00ffff; font-weight: bold; text-shadow: 1px 1px 0 #000;">${item}</span>`;
        analysisContainer.appendChild(itemDiv);
    });
    
    const memoryDiv = document.createElement('div');
    memoryDiv.style.cssText = `
        background: linear-gradient(135deg, rgba(255, 0, 255, 0.2) 0%, rgba(0, 255, 255, 0.2) 100%);
        padding: 20px;
        border: 4px solid #ffff00;
        border-style: double;
        margin-top: 15px;
        box-shadow: inset 0 0 15px rgba(255, 255, 0, 0.2);
    `;
    memoryDiv.innerHTML = `
        <div style="color: #ffff00; font-weight: bold; margin-bottom: 10px; font-size: 1.2em; text-shadow: 2px 2px 0 #ff00ff; font-family: 'Courier New', monospace;">
            ★ 炫舞记忆 ★
        </div>
        <div style="color: #ffffff; line-height: 1.8; font-style: italic; text-shadow: 1px 1px 0 #000;">
            ${personality.memories}
        </div>
    `;
    analysisContainer.appendChild(memoryDiv);
    
    const suggestionDiv = document.createElement('div');
    suggestionDiv.style.cssText = `
        background: linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(0, 255, 0, 0.2) 100%);
        padding: 20px;
        border: 3px solid #00ff00;
        border-style: outset;
        margin-top: 12px;
        box-shadow: inset 2px 2px 0 rgba(255, 255, 255, 0.1);
    `;
    suggestionDiv.innerHTML = `
        <div style="color: #00ff00; font-weight: bold; margin-bottom: 10px; font-size: 1.2em; text-shadow: 2px 2px 0 #000; font-family: 'Courier New', monospace;">
            ★ 给你的建议 ★
        </div>
        <div style="color: #ffffff; line-height: 1.8; text-shadow: 1px 1px 0 #000;">
            ${personality.suggestion}
        </div>
    `;
    analysisContainer.appendChild(suggestionDiv);
    
    const actionsDiv = resultSection.querySelector('.result-actions');
    resultSection.insertBefore(analysisContainer, actionsDiv);
}

// 生成人格配图
function generatePersonalityImage(type, personality) {
    const resultSection = document.getElementById('result');
    
    const oldImageContainer = document.getElementById('personalityImage');
    if (oldImageContainer) {
        oldImageContainer.remove();
    }
    
    const imageContainer = document.createElement('div');
    imageContainer.id = 'personalityImage';
    imageContainer.style.cssText = `
        margin: 30px 0;
        padding: 25px;
        background: linear-gradient(135deg, #ff00ff 0%, #ff69b4 50%, #00ffff 100%);
        border: 6px solid #ffff00;
        border-style: double;
        box-shadow: 
            0 0 30px rgba(255, 0, 255, 0.8),
            inset 0 0 30px rgba(255, 255, 255, 0.3);
        animation: rainbow-bg 5s linear infinite;
    `;
    
    const emojiMap = {
        'ENFJ': '🎭', 'ENTP': '🎨', 'INFJ': '🌙', 'ISTP': '⌨️',
        'ESTJ': '👔', 'INFP': '💝', 'ENTJ': '💎', 'ISFJ': '🛡️',
        'ENFP': '🎉', 'INTJ': '📊', 'ESTP': '⚔️', 'ISTJ': '⚓'
    };
    
    imageContainer.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 5em; margin-bottom: 15px; animation: twinkle 1s ease-in-out infinite;">
                ${emojiMap[type] || '★'}
            </div>
            <div style="color: #000; font-size: 1.5em; font-weight: bold; margin-bottom: 10px; text-shadow: 2px 2px 0 #fff; font-family: 'Courier New', monospace;">
                ${type} · ${personality.name}
            </div>
            <div style="color: #000; font-size: 1em; line-height: 1.6; max-width: 600px; margin: 0 auto; text-shadow: 1px 1px 0 #fff; font-weight: bold;">
                ${personality.imageDesc}
            </div>
            <div style="margin-top: 20px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                ${personality.traits.map(trait => `
                    <span style="
                        background: #000;
                        color: #ffff00;
                        padding: 8px 18px;
                        border: 3px solid #ff00ff;
                        border-style: outset;
                        font-size: 0.95em;
                        font-weight: bold;
                        text-shadow: 1px 1px 0 #ff00ff;
                        font-family: 'Courier New', monospace;
                        box-shadow: inset 2px 2px 0 rgba(255, 255, 255, 0.2);
                    ">★ ${trait} ★</span>
                `).join('')}
            </div>
        </div>
    `;
    
    const detailedAnalysis = document.getElementById('detailedAnalysis');
    if (detailedAnalysis) {
        resultSection.insertBefore(imageContainer, detailedAnalysis);
    } else {
        const actionsDiv = resultSection.querySelector('.result-actions');
        resultSection.insertBefore(imageContainer, actionsDiv);
    }
}

// 复制结果
function copyResult() {
    const type = document.getElementById('resultType').textContent;
    const name = document.getElementById('resultName').textContent;
    const desc = document.getElementById('resultDesc').textContent;
    const personality = personalityTypes[type];
    
    const traitsText = personality.traits.join(' · ');
    const analysisText = personality.analysis.join('\n');
    
    const text = `
【XWTI-PC 炫舞端游人格测试】

🎯 我的人格类型: ${type} - ${name}

${desc}

📌 特质标签: ${traitsText}

📊 深度解析:
${analysisText}

💭 炫舞记忆:
${personality.memories}

💡 给你的建议:
${personality.suggestion}

快来测测你是炫舞世界的哪一位传奇人物吧!
    `.trim();
    
    navigator.clipboard.writeText(text).then(() => {
        showToast();
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

// 显示提示
function showToast() {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// 重新测试
function restartTest() {
    currentQuestion = 0;
    answers = [];
    
    document.getElementById('result').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
    
    document.getElementById('progressFill').style.width = '0%';
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('炫舞端游人格测试已加载 - 新版本');
});
