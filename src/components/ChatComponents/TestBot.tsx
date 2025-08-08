import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';

// import BOT_AVATAR from '@/public/botProfile.svg';
// import  USER_AVATAR  from '@/public/profile.svg';
import { Chat } from '@/types/enums';
// import {
//   DELETE_FILE,
//   IMAGE_OPTIMIZER,
//   UPLOAD_FILE,
// } from '@/utils/APICONSTANTS';
// import FetchApi, { FileUploadApi } from '@/utils/apiUtils';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import { CldImage } from 'next-cloudinary';

interface ChatNode {
  id: string;
  type: string; // e.g., "text", "option", etc.
  data: string | { options: { label: string; nextNodeId: string }[] };
  nextNodeId?: string;
}

function TestBot({ chatNodes }) {
  const [fileLoader, setFileLoader] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [userTextReply, setUserTextReply] = useState('');
  const [messages, setMessages] = useState<ChatNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentNodeId, setCurrentNodeId] = useState<string | undefined>(
    chatNodes?.find((nd) => nd.type === 'trigger')?.id
  );
  // Upload File
  // const fileChangeHandler = async (e: React.ChangeEvent) => {
  //   setFileLoader(true);
  //   const formData = new FormData();

  //   formData.append('file', e?.target?.files[0]);
  //   if (e?.target?.files[0]) {
  //     try {
  //       const rawRes = FileUploadApi(
  //         UPLOAD_FILE,
  //         'POST',
  //         {
  //           Authorization: `Bearer ${getCookie('accessToken')}`,
  //         },
  //         formData
  //       );

  //       const res = await rawRes;
  //       if (res.status === 401) {
  //         setFileLoader(false);
  //         toast.error('You are not authorized');
  //       }
  //       const jsonRes = await res.json();

  //       setFileLoader(false);
  //       setSelectedFiles([...selectedFiles, jsonRes?.payload]);
  //       setMessages((prev) => {
  //         return [
  //           ...prev,
  //           {
  //             id: nanoid(),
  //             type: 'fileUpload',
  //             from: Chat?.user,
  //             data: { files: [jsonRes?.payload], allowFile: true },
  //           },
  //         ];
  //       });
  //       // updateNodeData(node?.id, {
  //       //   files: [...node?.data?.files, jsonRes?.payload],
  //       // });
  //     } catch (e) {}
  //   }
  // };
  // console.log(selectedFiles);
  // console.log(messages);

  // // Delete file
  // const fileDeleteHandler = (id) => {
  //   setFileLoader(true);

  //   async function deleteFile() {
  //     const res = FetchApi(DELETE_FILE + id, 'DELETE', {
  //       Authorization: `Bearer ${getCookie('accessToken')}`,
  //     });
  //     const data = await res;
  //     if (data?.payload) {
  //       setFileLoader(false);
  //       setSelectedFiles(selectedFiles?.filter((ele) => ele?.id !== id));
  //       // updateNodeData(node.id, {
  //       //   files: node?.data?.files?.filter((ele) => ele?.id !== id),
  //       // });
  //     }
  //     setFileLoader(false);
  //   }
  //   deleteFile();
  // };
  const addNextMessage = (nodeId: string | undefined) => {
    if (!nodeId) return;
    setLoading(true);
    const nextNode = chatNodes?.find((node) => node?.id === nodeId);

    const processNextNode = (node: ChatNode | undefined) => {
      if (!node) return;
      setTimeout(() => {
        setMessages((prev) => {
          // Check if the message is already in the list to prevent duplicates
          if (prev.some((msg) => msg?.id === node?.id)) return prev;
          return [...prev, node];
        });
      }, 1000);
      // if (node?.type === 'option' || 'feedback') {
      //   setCurrentNodeId(node?.id); // Stop execution and wait for user input
      //   return;
      // }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setTimeout(() => {
        if (node?.data?.targetNode) {
          processNextNode(
            chatNodes?.find((n) => n?.id === node?.data?.targetNode)
          );
        }
        setLoading(false);
      }, 1000);
    };

    processNextNode(nextNode);
  };
  console.log(messages);
  const fetchDataForOption = async (name, msg, targetNode) => {
    setMessages((prev) => {
      return [
        ...prev,
        {
          id: nanoid(),
          type: 'text',
          from: Chat?.user,
          data: { message: name },
        },
      ];
    });
    const nextNode = chatNodes?.find((n) => n?.id === targetNode);
    console.log(nextNode);

    if (nextNode && nextNode?.type === Chat?.api) {
      // addNextMessage(targetNode);
      const fetchData = await fetch(
        `https://dummyjson.com/${nextNode.data?.value}/2`
      );
      const data = await fetchData.json();
      const title = data?.title || data?.title;
      setMessages((prev) => {
        return [
          ...prev,
          {
            id: nanoid(),
            type: 'text',
            from: Chat?.bot,
            data: {
              message: nextNode?.data?.message,
              options: data?.products,
              data: {
                title: title,
                targetNode: nextNode?.data?.targetNode,
              },
            },
          },
        ];
      });
      
    } else {
      addNextMessage(
        msg?.data?.options.find((option) => option?.name === name)?.targetNode
      );
    }
    addNextMessage(nextNode?.data?.targetNode);
    // setMessages((prev) => {
    //   return [
    //     ...prev,
    //     {
    //       id: nanoid(),
    //       type: 'text',
    //       from: Chat?.bot,
    //       data: {
    //         message: `Here are the ${name} details`,
    //         targetNode: msg?.data?.options.find(
    //           (option) => option?.name === name
    //         )?.targetNode,
    //       },
    //     },
    //   ];
    // });
  };

  useEffect(() => {
    addNextMessage(currentNodeId);
  }, []);
  console.log(messages)
  return (
    <div className="relative chat-container bg-white shadow-md">
      <div className="container-head"></div>
      <div className="chat-ground">
        {messages?.length < 1 ? (
          <div
            className={`text-container  rounded-md
           bg-[#F4F0FF] px-4 py-2`}
          >
            Loading...
          </div>
        ) : (
          <div>
            {messages?.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg?.from === Chat?.bot ? 'bot-section' : 'user-section'
                } flex  gap-2 mt-4`}
              >
                {msg?.from === Chat?.bot && (
                  <div
                    className={`size-fit rounded-full bg-[#F4F0FF] p-1 
                  
                  `}
                  >
                    <img
                      src={
                        msg?.from === Chat?.bot
                          ? '/botProfile.svg'
                          : '/profile.svg'
                      }
                      alt="user-avatar"
                      width={17.3}
                      height={20.76}
                      className=""
                    />
                  </div>
                )}

                {msg.type === 'text' || msg.type === 'trigger' ? (
                  <div className="text-container">
                    <div
                      className={`${
                        msg?.from === Chat?.bot
                          ? 'bg-[#F4F0FF]'
                          : 'bg-[#F7F7F7]'
                      } rounded-md px-4 py-2`}
                    >
                      {loading &&
                      msg?.from === Chat?.bot &&
                      index === messages.length - 1
                        ? 'Loading...'
                        : msg?.data?.message}
                    </div>

                    {msg?.data?.files && (
                      <div className="grid grid-cols-3 gap-2">
                        {msg?.data?.files?.map((file) => (
                          <div className='m-auto pt-2'>
                          <CldImage
                            alt="img"
                            src={file}
                            width="30"
                            height="30"
                            crop={{
                              type: 'auto',
                              source: true,
                            }}
                          />
                        </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : msg?.type === 'option' || msg?.type === 'feedback' ? (
                  <div className="option-container">
                    <div className={``}>
                      <div
                        className={`${
                          msg?.from === Chat?.bot
                            ? 'bg-[#F4F0FF]'
                            : 'bg-[#F7F7F7]'
                        } rounded-md px-4 py-2`}
                      >
                        {msg?.data?.message}
                      </div>
                      <div
                        className={`my-4 flex flex-col rounded-md border border-[#F4F0FF] px-2 ${
                          index < messages?.length - 1 && 'hidden'
                        }`}
                      >
                        {msg?.data?.options?.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              fetchDataForOption(
                                option?.name,
                                msg,
                                option?.targetNode
                              );
                              // addNextMessage(option?.targetNode);
                            }}
                            className={`border-b p-2 text-[#7F56D9]`}
                          >
                            {option?.name || option?.category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : msg.type === 'api' ? (
                  <div className="text-container">
                    <div
                      className={`${
                        msg?.from === Chat?.bot
                          ? 'bg-[#F4F0FF]'
                          : 'bg-[#F7F7F7]'
                      } rounded-md px-4 py-2`}
                    >
                      {loading &&
                      msg?.from === Chat?.bot &&
                      index === messages.length - 1
                        ? 'Loading...'
                        : msg?.data?.message}
                    </div>
                  </div>
                ) : msg.type === Chat.collectInput ? (
                  <div className="text-container">
                    <div
                      className={`${
                        msg?.from === Chat?.bot
                          ? 'bg-[#F4F0FF]'
                          : 'bg-[#F7F7F7]'
                      } rounded-md px-4 py-2`}
                    >
                      {loading &&
                      msg?.from === Chat?.bot &&
                      index === messages.length - 1
                        ? 'Loading...'
                        : msg?.data?.message}
                    </div>

                    {msg?.data?.files && (
                      <div className="grid grid-cols-3 gap-2">
                        {msg?.data?.files?.map((file) => (
                          <div key={file?.id} className="m-auto">
                            <img
                              src={file?.url}
                              alt="file"
                              width={50}
                              height={50}
                              className="object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : msg?.type === 'fileUpload' ? (
                  <div className={`w-14 flex flex-col gap-4 `}>
                    {msg?.data?.files?.length > 0 &&
                      msg?.data?.files?.map((file) => (
                        <div key={file?.id} className="relative">
                          <img src={file?.url} alt="img" />
                          {/* <img src="/delete.svg" alt="delete" className='absolute -top-3 -right-4'/> */}
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
      {[Chat.collectInput, 'fileUpload']?.includes(
        messages[messages.length - 1]?.type
      ) && (
        <div className="absolute -bottom-2 rounded-lg flex items-center gap-2 w-full px-2 py-4 ">
          {(messages[messages.length - 1]?.data?.allowFile ||
            messages[messages.length - 1]?.type === 'fileUpload') && (
            <div className="flex flex-col items-center">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                // onChange={fileChangeHandler}
              />
              <label
                htmlFor="fileInput"
                title="Upload File"
                className="cursor-pointer "
              >
                <img src="/upload-file.svg" className="size-6" />
              </label>

              {/* Show selected file name */}
              {/* {selectedFiles &&
                selectedFiles?.map((f) => {
                  <img src={f?.url} alt="preview" />;
                })} */}
            </div>
          )}

          <input
            type="text"
            value={userTextReply}
            className="w-[85%]  px-4 py-1 rounded-full outline-none border border-[#7F56D9]"
            placeholder="Start typing..."
            onChange={(e) => setUserTextReply(e.target.value)}
          />
          <img
            src="/approve.svg"
            alt=""
            onClick={() => {
              setMessages((prev) => {
                return [
                  ...prev,
                  {
                    id: nanoid(),
                    type: Chat.collectInput,
                    from: Chat.user,
                    data: {
                      message: userTextReply,
                      allowFile: messages[messages.length - 1]?.data?.allowFile,
                    },
                  },
                ];
              });
              setUserTextReply('');
            }}
          />
        </div>
      )}
    </div>
  );
}

export default TestBot;
