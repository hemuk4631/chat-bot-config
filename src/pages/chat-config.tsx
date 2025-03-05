import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '@/components/button';


function ChatConfig() {
  
  const [workflows, setWorkflows] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const loadFlow = () => {
    const savedFlow = JSON.parse(localStorage.getItem('savedFlow')) || {};
    setWorkflows(Object.keys(savedFlow));
  };

  useEffect(() => {
    loadFlow();
  }, []);
  const removeWorkflow = (workflowName) => {
    setDeleteLoader(true);
    const savedFlow = JSON.parse(localStorage.getItem('savedFlow')) || {};
    if (savedFlow[workflowName]) {
      delete savedFlow[workflowName];
      localStorage.setItem('savedFlow', JSON.stringify(savedFlow));
      setDeleteLoader(false);
      setWorkflows(Object.keys(savedFlow));
    } else {
      setDeleteLoader(false);
    }
  };
  return (
    <>
      <div className="flex w-full flex-wrap justify-end">
        <Button
          btnName="Create New Config"
          btnType="Primary"
          onClick={() => Router.push('/chatbot-flow')}
        />
      </div>
      <div className="grid w-full grid-cols-2 gap-12 p-8  rounded-md">
        <div className="overflow-hidden rounded-md shadow-md">
          <table className="w-full border-none">
            <tr
              className={`rounded-md text-white-0`}>
              <th className="border-none p-2">Saved Workflow</th>
            </tr>
            <tbody className="">
              {workflows?.map((workflowName, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="flex justify-between border-none px-8 py-2">
                    <Link
                      href={`/chatbot-flow?workflow=${workflowName}`}
                      className={`font-semibold  hover:underline`}>
                      {workflowName}
                    </Link>
                    <div onClick={() => removeWorkflow(workflowName)}>
                      {deleteLoader ? (
                        'Loading...'
                      ) : (
                        <img
                          src="/delete.svg"
                          alt="delete"
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-hidden rounded-md shadow-md">
          <table className="w-full border-none">
            <tr
              className={` rounded-md text-white-0`}>
              <th className="border-none p-2">Deployed Workflow</th>
            </tr>
            <tbody className="">
              {workflows?.map((workflowName, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="flex justify-between border-none px-8 py-2">
                    <Link
                      href={`/chatbot-flow?workflow=${workflowName}`}
                      className={`font-semibold  hover:underline`}>
                      {workflowName}
                    </Link>
                    <div onClick={() => removeWorkflow(workflowName)}>
                      {deleteLoader ? (
                        'Loading...'
                      ) : (
                        <img
                          src="/delete.svg"
                          alt="delete"
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ChatConfig;
