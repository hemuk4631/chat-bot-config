import type { Node } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';
import { getCookie } from 'cookies-next';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Chat } from '@/types/enums';

import type { ChatFlowNodesData } from '@/types/enums';
// import { DELETE_FILE, UPLOAD_FILE } from '@/utils/APICONSTANTS';
// import FetchApi, { FileUploadApi } from '@/utils/apiUtils';

// import Loader from './loader';

const ChatTriggerForm = ({ node }: { node: Node<ChatFlowNodesData> }) => {
  const [fileLoader, setFileLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const { updateNodeData } = useReactFlow();
  const message = node?.data?.[Chat.nodeMessage];
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
  //       setSelectedFile([...selectedFile, jsonRes?.payload]);

  //       updateNodeData(node.id, { files: [...selectedFile, jsonRes?.payload] });
  //     } catch (e) {}
  //   }
  // };
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
  //       setSelectedFile(selectedFile?.filter((ele) => ele?.id !== id));
  //       updateNodeData(node.id, {
  //         files: node?.data?.files?.filter((ele) => ele?.id !== id),
  //       });
  //     }
  //     setFileLoader(false);
  //   }
  //   deleteFile();
  // };
  return (
    <div className="max-w-md rounded-md border  p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-500">💬</span>
          <span className="text-lg font-semibold">Send message</span>
        </div>
      </div>

      {/* Title */}
      <input
        className="mt-3 w-full border-b text-lg font-medium  outline-none focus:border-b-blue-700"
        defaultValue={node?.data?.[Chat.nodeTitle]}
        onChange={(e) => {
          const newTitle = e.target.value ? e.target.value : '';
          updateNodeData(node.id, {
            [Chat.nodeTitle]: newTitle,
          });
        }}
      />

      <div className="mt-1 text-sm text-gray-600">Sends this message</div>

      <div className="mt-2 rounded-md border bg-white p-2">
        <textarea
          className="h-24 w-full resize-none border-none p-2 text-xs focus:ring-0"
          defaultValue={message ? message : ''}
          onChange={(e) => {
            const newMessage = e.target.value ? e.target.value : '';
            updateNodeData(node.id, {
              [Chat.nodeMessage]: newMessage,
            });
          }}
        />

        {/* Footer */}
        {/* <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>You can reference a variable by typing #</span>
          <span>{message.length}</span>
        </div> */}
      </div>
      {selectedFile?.length > 0 &&
        selectedFile?.map((ele, i) => (
          <div
            key={i}
            className="my-2 flex items-center justify-between rounded-md bg-gray-200 px-4 py-2"
          >
            <div>
              <img src={ele?.url} alt="" className="w-8" />
            </div>
            <div>
              <img
                src="/delete.svg"
                alt=""
                // onClick={() => {
                //   fileDeleteHandler(ele?.id);
                // }}
              />
            </div>
          </div>
        ))}
      <div className="mt-2 flex justify-end">
        {fileLoader ? (
          <div className="cursor-pointer rounded-md border bg-gray-100 px-3 py-1 text-sm">
            loading...
          </div>
        ) : (
          <label className="cursor-pointer  rounded-md border bg-gray-100 px-3 py-1 text-sm">
            + File
            <input
              type="file"
              className="hidden"
              // onChange={(e) => fileChangeHandler(e)}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ChatTriggerForm;
