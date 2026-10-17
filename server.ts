import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI SDK (Server-Side Only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    system: 'Feng Shui Dynasty BaZi Analysis System (天佑风水子平八字命理系统)',
    brand: 'MASTER JOE CHEW / 趙天佑',
    timestamp: new Date().toISOString()
  });
});

// Server-side Gemini API interpretation endpoint
app.post('/api/gemini/interpret', async (req: Request, res: Response) => {
  try {
    const { client, chart, approvedKnowledgeBase } = req.body;

    if (!client || !chart) {
      return res.status(400).json({ error: 'Missing client or chart payload' });
    }

    const systemInstruction = `
你担任马来西亚吉隆坡【天佑风水·趙天佑命理宗师 (Master Joe Chew)】的权威 AI 研判助手。
【核心纪律与铁律】：
1. 绝对严禁自行重新计算、篡改、覆盖任何输入的确定性四柱干支、藏干、十神、日主旺衰及八分精算分值！
2. 输入的排盘与八分法数值为确定性数学事实（如陈美玲：庚午年、壬申月、乙午日、辛巳时，八分精算同党1.25/8.00分，身弱格），必须以此为基石。
3. 必须以宗师认证之《子平八字资料.pdf》（含《图解八字》、《子平真诠》、《滴天髓》正统传承）为唯一合法且权威的知识依据。
4. 深度研判必须全面覆盖五大核心维度：财富 (Wealth)、事业 (Career)、感情 (Relationship)、家庭 (Family)、健康 (Health)。
5. 建议必须严格区分【趋吉 (Opportunity Enhancement)】与【避凶 (Risk Reduction)】。不得承诺保证发财、保证投资回报或断言医学疾病，健康建议仅限传统五行养生。
6. 若输入的知识依据不足以推导出确定性结论，必须如实输出："知识库依据不足，待趙天佑师傅审核。"，严禁编造未经宗师审核的旁门左道。
7. 语言风格：正统文雅的中文传统命理风格，典雅深邃且切实可行。

【宗师核准知识库规则 (引自《子平八字资料.pdf》)】：
${approvedKnowledgeBase || '《子平八字资料.pdf》卷四·十神正变与财禄真诠：乙木生秋身弱，得壬水透出化杀生身，名伤官生财格，印星贴护，逢凶化吉。'}
`;

    const userPrompt = `
请为以下客户生成权威命理草案：
客户姓名：${client.name}
性别：${client.gender === 'female' ? '坤造 (女)' : '乾造 (男)'}
出生资料：公历 ${client.birthDate} ${client.birthTime}，出生地 ${client.birthLocation}
四柱原局：
- 时柱：${chart.hour}
- 日柱：${chart.day} (命主元神：${chart.dayMaster})
- 月柱：${chart.month}
- 年柱：${chart.year}
旺衰评定：${chart.strength} (八分精算 同党 ${chart.eightPointSupportTotal} 分 / 异党 ${chart.eightPointDrainTotal} 分，平衡指数 ${chart.eightPointScore})
当前大运五行：${chart.currentLuck}
格局定论：${client.patternName}
用神：${client.usefulGods} ｜ 忌神：${client.unfavorableGods}

请以严格的 JSON 格式输出如下键值：
{
  "summary": "命局总纲与日元旺衰判定 (150字)",
  "patternAnalysis": "格局清浊与十神配合深度解密 (150字)",
  "personalityStrengths": "先天性情与天赋潜能指引 (100字)",
  "careerAndWealth": "事业运势与一生正偏财禄机缘 (150字)",
  "romanceAndMarriage": "情感婚姻与六亲家庭缘分 (100字)",
  "luckCycleGuide": "十年大运与流年转折关键节点 (120字)",
  "remedyAndFengShui": "趋吉避凶与专属风水开运锦囊 (100字)"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            patternAnalysis: { type: Type.STRING },
            personalityStrengths: { type: Type.STRING },
            careerAndWealth: { type: Type.STRING },
            romanceAndMarriage: { type: Type.STRING },
            luckCycleGuide: { type: Type.STRING },
            remedyAndFengShui: { type: Type.STRING },
          },
          required: [
            'summary',
            'patternAnalysis',
            'personalityStrengths',
            'careerAndWealth',
            'romanceAndMarriage',
            'luckCycleGuide',
            'remedyAndFengShui'
          ]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini model returned empty response');
    }

    const draft = JSON.parse(text);
    return res.json({ draft });
  } catch (error: any) {
    console.error('Error generating AI report draft with Gemini:', error);
    return res.status(500).json({
      error: 'Failed to generate AI report draft',
      message: error.message
    });
  }
});

// Sandbox Payment verification endpoint
app.post('/api/orders/verify', (req: Request, res: Response) => {
  const { orderId, amountMYR, paymentMethod } = req.body;
  res.json({
    verified: true,
    orderId,
    amountMYR,
    paymentMethod,
    transactionRef: `FPX-MY-${Date.now()}`,
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Setup Vite middleware in dev or static server in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled
          ? false
          : {
              server: httpServer,
              clientPort: 443,
            },
        ws: isHmrDisabled
          ? false
          : {
              server: httpServer,
            },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  httpServer.listen(PORT, () => {
    console.log(`Feng Shui Dynasty BaZi Server running on http://localhost:${PORT}`);
  });
}

startServer();
