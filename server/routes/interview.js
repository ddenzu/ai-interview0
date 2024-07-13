const express = require('express');
const router = express.Router();
const { createCompletion } = require('../utils/openai.js');

router.post('/', async (req, res) => {
    try {
      let { userMessages, assistantMessages } = req.body;
  
      let messages = [
        { role: 'system', content: '당신은 세계 최고의 인공지능 면접관 입니다. 당신은 제가 희망하는 기업의 면접관이 되어서 사무적인 말투로 적절한 면접 질문을 해야 합니다. 당신은 면접에서 자주 출제되는 핵심적이고 기술적인 질문을 준비합니다. 면접의 진행 방식은 다음과 같습니다. 첫 번째 한 가지의 질문을 하고 채팅을 전송 합니다. 저의 첫 번째 대답을 받아야 지만 다음 두 번째 질문을 할 수 있습니다. 이렇게 순차적인 방식으로 진행합니다. 두 번째 질문을 물어봤다면 저의 부족한 부분을 기술적으로 피드백을 해주면서 "면접은 여기서 마무리 하겠습니다. 수고하셨습니다."라고 마지막 말을 붙인 뒤 면접을 종료 합니다. 먼저 저에게 희망하는 직업이나 직무가 무엇인지 질문해 주세요. 절대로 여러개의 질문을 동시에 하면 안됩니다.' },
        { role: 'user', content: '당신은 세계 최고의 인공지능 면접관 입니다. 당신은 제가 희망하는 기업의 면접관이 되어서 사무적인 말투로  적절한 면접 질문을 해야 합니다. 당신은 면접에서 자주 출제되는 핵심적이고 기술적인 질문을 준비합니다. 면접의 진행 방식은 다음과 같습니다. 첫 번째 한 가지의 질문을 하고 채팅을 전송 합니다. 저의 첫 번째 대답을 받아야 지만 다음 두 번째 질문을 할 수 있습니다. 이렇게 순차적인 방식으로 진행합니다. 두 번째 질문을 물어봤다면 저의 부족한 부분을 기술적으로 피드백을 해주면서 "면접은 여기서 마무리 하겠습니다. 수고하셨습니다."라고 마지막 말을 붙인 뒤 면접을 종료 합니다. 먼저 저에게 희망하는 직업이나 직무가 무엇인지 질문해 주세요. 절대로 여러개의 질문을 동시에 하면 안됩니다.' },
        { role: 'assistant', content: '안녕하세요! 저는 인공지능 면접관입니다. 당신이 희망하는 직업이나 직무가 무엇인지 알려주시겠어요? 그러면 해당 직무에 관련된 첫 번째 면접 질문을 준비해 드릴게요.' }
      ];
  
      while (userMessages.length || assistantMessages.length) {
        if (userMessages.length) {
          messages.push({
            role: 'user',
            content: String(userMessages.shift()).replace(/\n/g, '')
          });
        }
        if (assistantMessages.length) {
          messages.push({
            role: 'assistant',
            content: String(assistantMessages.shift()).replace(/\n/g, '')
          });
        }
      }
      const completion = await createCompletion(messages);
      let interview = completion.choices[0].message['content'];
      res.json(interview); // 기본적인 상태코드(200)
    } catch (error) {
      console.error('서버 오류:', error);
      res.status(500).json('서버 에러');
    }
  });
  
  module.exports = router;