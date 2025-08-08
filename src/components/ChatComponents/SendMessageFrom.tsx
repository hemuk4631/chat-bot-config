import type { Node } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';
import { getCookie } from 'cookies-next';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Chat } from '@/types/enums';
import { CldImage } from 'next-cloudinary';
import type { ChatFlowNodesData } from '@/types/enums';
// import {
//   DELETE_FILE,
//   IMAGE_OPTIMIZER,
//   UPLOAD_FILE,
// } from '@/utils/APICONSTANTS';
// import FetchApi, { FileUploadApi } from '@/utils/apiUtils';

// import Loader from '../loader';
const SendMessageForm = ({ node }: { node: Node<ChatFlowNodesData> }) => {
  console.log(node?.data);
  const [fileLoader, setFileLoader] = useState(false);
  const { updateNodeData } = useReactFlow();

  const message = node?.data?.[Chat.nodeMessage];
  // Upload File
  const fileChangeHandler = async (e: React.ChangeEvent) => {
    setFileLoader(true);
    const formData = new FormData();

    formData.append('file', e?.target?.files[0]);
    if (e?.target?.files[0]) {
      try {
        // const rawRes = FileUploadApi(
        //   UPLOAD_FILE,
        //   'POST',
        //   {
        //     Authorization: `Bearer ${getCookie('accessToken')}`,
        //   },
        //   formData
        // );

        // const res = await rawRes;
        // if (res.status === 401) {
        //   setFileLoader(false);
        //   toast.error('You are not authorized');
        // }
        // const jsonRes = await res.json();
        formData.append('file', e?.target?.files[0]);
        formData.append('upload_preset', 'upload-image'); // e.g., "my_uploads"

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        setFileLoader(false);

        updateNodeData(node?.id, {
          files: node?.data?.files
            ? [...node?.data?.files, data.public_id]
            : [data.public_id],
        });
      } catch (e) {}
    }
  };
  // Delete file
  const fileDeleteHandler = (id) => {
    setFileLoader(true);

    // async function deleteFile() {
    //   // const res = FetchApi(DELETE_FILE + id, 'DELETE', {
    //   //   Authorization: `Bearer ${getCookie('accessToken')}`,
    //   // });
    //   // const data = await res;
    //   // if (data?.payload) {

    //   updateNodeData(node.id, {
    //     files: node?.data?.files?.filter((ele) => ele?.id !== id),
    //   });
    //   // }
    //   setFileLoader(false);
    // }
    const deleteFile = async (publicId: string) => {
      try {
        const res = await fetch('api/deleteImage', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ public_id: publicId }),
        });

        const data = await res.json();
        console.log(data);

        if (data.result) {
          toast.success('Image deleted successfully!');
            updateNodeData(node.id, {
        files: node?.data?.files?.filter((ele) => ele !== publicId),
      });
        } else {
          console.error('Delete failed:', data);
          toast.error('Failed to delete image');
        }
      } catch (err) {
        toast.error('Error deleting image:', err);
      }finally{
        setFileLoader(false);
      }
    };
    deleteFile(id);
  };
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
          className="h-24 w-full resize-none border rounded-md p-2 text-xs focus:ring-0"
          defaultValue={message ? message : ''}
          onChange={(e) => {
            const newMessage = e.target.value ? e.target.value : '';
            updateNodeData(node.id, {
              [Chat.nodeMessage]: newMessage,
            });
          }}
        />

        {/* Footer */}
        {/* <div className="mt-1  text-xs text-gray-500">
          <span>You can reference a variable by typing $</span>
        </div> */}
      </div>
      {node?.data?.files?.map((ele, i) => (
        <div
          key={ele}
          className="my-2 flex items-center justify-between rounded-md bg-gray-200 px-4 py-2"
        >
          <div>
            <CldImage
              alt="img"
              src={ele}
              width="30"
              height="30"
              crop={{
                type: 'auto',
                source: true,
              }}
            />
          </div>
          <div>
            <img
              src="/delete.svg"
              alt="delete"
              onClick={() => {
                fileDeleteHandler(ele);
              }}
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
              onChange={(e) => fileChangeHandler(e)}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default SendMessageForm;
