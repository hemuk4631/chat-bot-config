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
      <div className="flex w-full flex-wrap justify-end p-14">
        <Button
          btnName="Create New Config"
          btnType="primary"
          onClick={() => Router.push('/chatbot-flow')}
        />
      </div>

      <div className=" text-blue-400 grid w-[70%] p-20 align-middle m-auto h-100 items-center grid-cols-2 gap-12 border border-blue-400   rounded-md">
      <div>
          <label htmlFor="" className="px-2 py-1 border rounded-md  bg-blue-300 text-white">
            Saved
          </label>
          <div className=" min-h-[70%] p-4 border border-blue-500 rounded-md mt-2">
          {workflows?.length ? (
            <table className="w-full border-none">
              <tbody className="">
                {workflows?.map((workflowName, index) => (
                  <tr key={index} className="text-center">
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
          ) : (
            <div className="flex items-center justify-center text-red-500">
              No config found
            </div>
          )}
          </div>
        </div>

        <div>
          <label htmlFor="" className="px-2 py-1 border rounded-md  bg-blue-300 text-white">
            Deployed
          </label>
          <div className=" min-h-[70%] p-4 border border-blue-500 rounded-md mt-2">
          {workflows?.length ? (
            <table className="w-full border-none">
              <tbody className="">
                {workflows?.map((workflowName, index) => (
                  <tr key={index} className="text-center">
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
          ) : (
            <div className="flex items-center justify-center text-red-500">
              No config found
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatConfig;
