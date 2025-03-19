import React from 'react';
import PageHeading from '../../../../Components/Shared/PageHeading';
import { Button, Card, Space } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa6';

function FrequentlyAskedQuestions() {
  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer:
        'Fill in the required details, including your full name, email address, and a secure password. Ensure your email is valid as it will be used for account verification and communication.',
    },
    {
      question: 'How do I book an appointment?',
      answer:
        'Fill in the required details, including your full name, email address, and a secure password. Ensure your email is valid as it will be used for account verification and communication.',
    },
    {
      question: 'How do I book an appointment?',
      answer:
        'Fill in the required details, including your full name, email address, and a secure password. Ensure your email is valid as it will be used for account verification and communication.',
    },
    {
      question: 'How do I book an appointment?',
      answer:
        'Fill in the required details, including your full name, email address, and a secure password. Ensure your email is valid as it will be used for account verification and communication.',
    },
    {
      question: 'How do I book an appointment?',
      answer:
        'Fill in the required details, including your full name, email address, and a secure password. Ensure your email is valid as it will be used for account verification and communication.',
    },
  ];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between !w-full mb-12">
        <PageHeading title={'FAQ'} />
        <Button onClick={() => {}} type="primary">
          <FaPlus />
          Add FAQ
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {faqs.map((item, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between my-4">
              <h1>{item.question}</h1>
              <Space>
                <Button>
                  <FaEdit />
                </Button>
                <Button>
                  <AiTwotoneDelete />
                </Button>
              </Space>
            </div>
            <p>{item.answer}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FrequentlyAskedQuestions;
