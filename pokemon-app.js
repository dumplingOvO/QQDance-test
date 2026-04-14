// 宝可梦版测试逻辑

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
    
    // 每隔5题显示一句宝可梦语句
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
            button.style.borderColor = '#FFCB05';
            button.style.background = 'linear-gradient(135deg, #FFCB05 0%, #FF9800 100%)';
            button.style.color = '#2A2A2A';
            button.style.boxShadow = '0 6px 25px rgba(255, 203, 5, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.4)';
        }
        
        optionsContainer.appendChild(button);
    });
    
    // 更新导航按钮状态
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = answers[index] === undefined;
    
    currentQuestion = index;
}

// 显示宝可梦语句提示
function showNostalgicToast(message) {
    const toast = document.createElement('div');
    toast.innerHTML = `⚪ ${message}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #FFCB05 0%, #FF9800 100%);
        color: #2A2A2A;
        padding: 18px 35px;
        border-radius: 50px;
        border: 3px solid #3B4CCA;
        box-shadow: 
            0 6px 25px rgba(255, 203, 5, 0.4),
            inset 0 2px 0 rgba(255, 255, 255, 0.4);
        z-index: 1000;
        font-size: 1.1em;
        font-weight: bold;
        animation: fadeInUp 0.5s ease, fadeOutDown 0.5s ease 2.5s forwards;
        max-width: 90%;
        text-align: center;
        line-height: 1.6;
        font-family: 'Microsoft YaHei', sans-serif;
        letter-spacing: 1px;
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
    
    // 更新选项按钮样式 - 宝可梦风格
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
        if (i === optionIndex) {
            // 选中状态 - 精灵球红+金边
            btn.style.borderColor = '#FFCB05';
            btn.style.background = 'linear-gradient(135deg, #CC0000 0%, #D32F2F 50%, #CC0000 100%)';
            btn.style.color = '#FFFFFF';
            btn.style.boxShadow = '0 6px 25px rgba(204, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)';
        } else {
            // 未选中状态 - 杰尼龟蓝边+白底
            btn.style.borderColor = '#3B4CCA';
            btn.style.background = 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #FFFFFF 100%)';
            btn.style.color = '#2A2A2A';
            btn.style.boxShadow = '0 4px 12px rgba(59, 76, 202, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.8)';
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
    // 从池子中获取随机宝可梦
    const selectedPokemon = getRandomPokemon(type);
    const pool = pokemonPools[type];
    
    if (!selectedPokemon) {
        console.error('未找到对应的宝可梦池');
        return;
    }
    
    // 隐藏加载页面
    document.getElementById('loading').style.display = 'none';
    
    // 显示结果页面
    document.getElementById('result').style.display = 'block';
    
    // 填充结果数据
    document.getElementById('resultType').textContent = type;
    document.getElementById('resultName').textContent = selectedPokemon.name;
    document.getElementById('resultDesc').textContent = selectedPokemon.desc;
    
    // 显示特质标签
    const traitsContainer = document.getElementById('resultTraits');
    traitsContainer.innerHTML = '';
    
    selectedPokemon.traits.forEach(trait => {
        const tag = document.createElement('span');
        tag.className = 'trait-tag';
        tag.textContent = '◓ ' + trait + ' ◓';
        traitsContainer.appendChild(tag);
    });
    
    // 显示池子信息
    try {
        showPoolInfo(pool, type);
    } catch (error) {
        console.error('Error showing pool info:', error);
    }
    
    // 显示详细分析
    try {
        showDetailedAnalysis(selectedPokemon, pool);
    } catch (error) {
        console.error('Error showing detailed analysis:', error);
    }
    
    // 生成并显示宝可梦图片
    try {
        generatePokemonImage(selectedPokemon, type);
    } catch (error) {
        console.error('Error generating pokemon image:', error);
    }
}

// 显示池子信息
function showPoolInfo(pool, type) {
    const resultSection = document.getElementById('result');
    
    const oldPoolInfo = document.getElementById('poolInfo');
    if (oldPoolInfo) {
        oldPoolInfo.remove();
    }
    
    const poolInfoDiv = document.createElement('div');
    poolInfoDiv.id = 'poolInfo';
    poolInfoDiv.style.cssText = `
        margin: 25px 0;
        padding: 25px;
        background: linear-gradient(135deg, #FFF9C4 0%, #FFF3E0 100%);
        border-radius: 20px;
        border: 3px solid #FFCB05;
        box-shadow: 0 4px 20px rgba(255, 203, 5, 0.2);
    `;
    
    poolInfoDiv.innerHTML = `
        <div style="text-align: center;">
            <div style="color: #CC0000; font-family: 'Righteous', sans-serif; font-size: 1.4em; font-weight: bold; margin-bottom: 12px; letter-spacing: 2px;">
                ${pool.poolName}
            </div>
            <div style="color: #2A2A2A; line-height: 1.8; font-size: 1.05em;">
                ${pool.description}
            </div>
            <div style="color: #3B4CCA; margin-top: 12px; font-size: 0.95em; font-weight: bold;">
                池中共有 ${pool.pokemons.length} 只符合 ${type} 特质的宝可梦
            </div>
        </div>
    `;
    
    const actionsDiv = resultSection.querySelector('.result-actions');
    resultSection.insertBefore(poolInfoDiv, actionsDiv);
}

// 显示详细分析
function showDetailedAnalysis(pokemon, pool) {
    console.log('showDetailedAnalysis called with:', pokemon.name);
    
    const resultSection = document.getElementById('result');
    
    const oldAnalysis = document.getElementById('detailedAnalysis');
    if (oldAnalysis) {
        oldAnalysis.remove();
    }
    
    const analysisContainer = document.createElement('div');
    analysisContainer.id = 'detailedAnalysis';
    analysisContainer.style.cssText = `
        margin-top: 30px;
        padding: 30px;
        background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%);
        border-radius: 25px;
        border: 3px solid #3B4CCA;
        box-shadow: 0 4px 20px rgba(59, 76, 202, 0.15);
        text-align: left;
    `;
    
    const analysisTitle = document.createElement('h3');
    analysisTitle.innerHTML = '⚡ 宝可梦深度解析 ⚡';
    analysisTitle.style.cssText = `
        color: #3B4CCA;
        font-family: 'Righteous', sans-serif;
        font-size: 1.6em;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    `;
    analysisContainer.appendChild(analysisTitle);
    
    // 获取增强数据
    console.log('Getting enhanced data for:', pokemon.name);
    let enhancedData;
    try {
        enhancedData = getEnhancedPokemonData(pokemon.name);
        if (!enhancedData) {
            console.log('No enhanced data found, generating basic tips');
            enhancedData = generateBasicTips(pokemon.name, pokemon.types, pokemon.traits);
        }
        console.log('Enhanced data:', enhancedData);
    } catch (error) {
        console.error('Error getting enhanced data:', error);
        enhancedData = {
            tips: `${pokemon.name}是一只独特的宝可梦!`,
            funFacts: [`拥有${pokemon.types.join('/')}属性`, `特质: ${pokemon.traits.join('、')}`],
            personalityInterpretation: pokemon.reason
        };
    }
    
    // 卡片1: 为什么是你 - 整合属性、特质、小贴士和人格诠释
    const mainCardDiv = document.createElement('div');
    mainCardDiv.style.cssText = `
        background: linear-gradient(135deg, #FFE0E0 0%, #FFCDD2 100%);
        padding: 28px;
        border-radius: 20px;
        border: 3px solid #CC0000;
        margin-bottom: 20px;
        box-shadow: 0 4px 15px rgba(204, 0, 0, 0.15);
    `;
    mainCardDiv.innerHTML = `
        <div style="color: #CC0000; font-family: 'Righteous', sans-serif; font-weight: bold; margin-bottom: 15px; font-size: 1.4em; text-align: center; letter-spacing: 1px;">
            ❤️ 为什么是你?
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.5); padding: 15px; border-radius: 12px; margin-bottom: 15px;">
            <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; margin-bottom: 10px;">
                <span style="background: linear-gradient(135deg, #CC0000 0%, #D32F2F 100%); color: #FFF; padding: 8px 16px; border-radius: 50px; font-size: 0.95em; font-weight: bold;">
                    🔮 ${pokemon.types.join(' / ')}
                </span>
                <span style="background: linear-gradient(135deg, #FFCB05 0%, #FF9800 100%); color: #2A2A2A; padding: 8px 16px; border-radius: 50px; font-size: 0.95em; font-weight: bold;">
                    ⭐ ${pokemon.traits.join(' · ')}
                </span>
            </div>
        </div>
        
        <div style="color: #2A2A2A; line-height: 1.9; font-size: 1.05em; margin-bottom: 15px;">
            ${pokemon.reason}
        </div>
        
        <div style="background: linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%); padding: 15px; border-radius: 12px; border-left: 4px solid #FFCB05;">
            <div style="color: #F57C00; font-weight: bold; margin-bottom: 8px; font-size: 1em;">💡 ${enhancedData.tips}</div>
        </div>
    `;
    analysisContainer.appendChild(mainCardDiv);
    
    // 卡片2: 你与宝可梦的深度联结 - 人格诠释
    const personalityDiv = document.createElement('div');
    personalityDiv.style.cssText = `
        background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%);
        padding: 25px;
        border-radius: 18px;
        border: 2px solid #9C27B0;
        margin-bottom: 20px;
        box-shadow: 0 3px 12px rgba(156, 39, 176, 0.2);
    `;
    personalityDiv.innerHTML = `
        <div style="color: #6A1B9A; font-family: 'Righteous', sans-serif; font-weight: bold; margin-bottom: 12px; font-size: 1.25em;">
            💫 你与${pokemon.name}的深度联结
        </div>
        <div style="color: #2A2A2A; line-height: 1.9; font-size: 1.05em;">
            ${enhancedData.personalityInterpretation}
        </div>
    `;
    analysisContainer.appendChild(personalityDiv);
    
    // 卡片3: 精选冷知识 - 只显示2-3条最有价值的
    const funFactsDiv = document.createElement('div');
    funFactsDiv.style.cssText = `
        background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
        padding: 22px;
        border-radius: 18px;
        border: 2px solid #3B4CCA;
        box-shadow: 0 3px 12px rgba(59, 76, 202, 0.15);
    `;
    
    // 只保留前2-3条最有价值的冷知识
    const topFacts = enhancedData.funFacts.slice(0, 3);
    const funFactsHTML = topFacts.map(fact => `
        <div style="margin: 12px 0; padding-left: 25px; position: relative;">
            <span style="position: absolute; left: 0; color: #3B4CCA; font-size: 1.1em;">⚡</span>
            <span style="color: #2A2A2A; line-height: 1.7; font-size: 1em;">${fact}</span>
        </div>
    `).join('');
    
    funFactsDiv.innerHTML = `
        <div style="color: #3B4CCA; font-family: 'Righteous', sans-serif; font-weight: bold; margin-bottom: 15px; font-size: 1.2em;">
            🎮 关于${pokemon.name}的冷知识
        </div>
        ${funFactsHTML}
    `;
    analysisContainer.appendChild(funFactsDiv);
    
    const actionsDiv = resultSection.querySelector('.result-actions');
    resultSection.insertBefore(analysisContainer, actionsDiv);
}

// 生成宝可梦图片
function generatePokemonImage(pokemon, type) {
    const resultSection = document.getElementById('result');
    
    const oldImageContainer = document.getElementById('personalityImage');
    if (oldImageContainer) {
        oldImageContainer.remove();
    }
    
    const imageContainer = document.createElement('div');
    imageContainer.id = 'personalityImage';
    imageContainer.style.cssText = `
        margin: 30px 0;
        padding: 40px;
        background: linear-gradient(135deg, #FFF9C4 0%, #FFF3E0 50%, #FFE0B2 100%);
        border-radius: 30px;
        border: 5px solid #FFCB05;
        box-shadow: 
            0 8px 30px rgba(255, 203, 5, 0.3),
            inset 0 2px 0 rgba(255, 255, 255, 0.8);
    `;
    
    const pokemonImageUrl = getPokemonImageUrl(pokemon.name);
    
    imageContainer.innerHTML = `
        <div style="text-align: center;">
            <div style="margin-bottom: 25px; position: relative; display: inline-block;">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 340px;
                    height: 340px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 249, 196, 0.6) 40%, transparent 70%);
                    border-radius: 50%;
                    z-index: 1;
                "></div>
                <img 
                    src="${pokemonImageUrl}" 
                    alt="${pokemon.name}"
                    style="width: 340px; height: 340px; object-fit: contain; 
                           animation: float 3s ease-in-out infinite; 
                           filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
                           position: relative;
                           z-index: 2;
                           background: transparent;"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                />
                <div style="display: none; font-size: 5em; animation: float 3s ease-in-out infinite;">
                    ⚪
                </div>
            </div>
            <div style="color: #2A2A2A; font-family: 'Fredoka One', sans-serif; font-size: 3em; font-weight: bold; margin-bottom: 15px; 
                        letter-spacing: 3px;">
                ${pokemon.name}
            </div>
            <div style="color: #CC0000; font-family: 'Righteous', sans-serif; font-size: 1.5em; font-weight: bold; margin-bottom: 20px; 
                        letter-spacing: 2px;">
                ${type} · ${pokemonPoolName(type)}
            </div>
            <div style="color: #2A2A2A; font-size: 1.15em; line-height: 1.9; max-width: 700px; 
                        margin: 0 auto; padding: 0 20px;">
                ${pokemon.desc}
            </div>
            <div style="margin-top: 25px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                ${pokemon.traits.map(trait => `
                    <span style="
                        background: linear-gradient(135deg, #CC0000 0%, #D32F2F 100%);
                        color: #FFFFFF;
                        padding: 10px 24px;
                        border-radius: 50px;
                        font-size: 1em;
                        font-weight: bold;
                        box-shadow: 
                            0 4px 12px rgba(204, 0, 0, 0.3),
                            inset 0 2px 0 rgba(255, 255, 255, 0.3);
                        letter-spacing: 1px;
                    ">${trait}</span>
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

// 获取池子名称
function pokemonPoolName(type) {
    const pool = pokemonPools[type];
    return pool ? pool.poolName : '';
}

// 复制结果
function copyResult() {
    const type = document.getElementById('resultType').textContent;
    const name = document.getElementById('resultName').textContent;
    const desc = document.getElementById('resultDesc').textContent;
    
    // 从当前显示的宝可梦获取信息
    const pool = pokemonPools[type];
    const pokemon = pool.pokemons.find(p => p.name === name);
    
    if (!pokemon) {
        console.error('未找到宝可梦信息');
        return;
    }
    
    const traitsText = pokemon.traits.join(' · ');
    
    const text = `
【宝可梦人格测试】

🎯 我的人格类型: ${type} - ${name}

${desc}

📌 核心特质: ${traitsText}
📌 属性: ${pokemon.types.join(' / ')}

💭 为什么是你?
${pokemon.reason}

🏊 池子信息: ${pool.poolName} (共${pool.pokemons.length}只宝可梦)

快来测测你像哪只宝可梦吧!
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
    console.log('宝可梦人格测试已加载');
});
