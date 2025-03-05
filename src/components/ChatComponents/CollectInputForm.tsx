import type { Node } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';
import React, { useState } from 'react';

import { type ChatFlowNodesData, Chat } from '@/types/enums';
const fileTypes = [
  'pdf',
  'jpg',
  'png',
  'doc',
  'docx',
  'ppt',
  'xls',
  'xlsx',
  'csv',
];
const maxFileSize = [
  { label: 'Select...', value: '' },
  { label: '2MB', value: '2MB' },
  { label: '3MB', value: '3MB' },
  { label: '4MB', value: '4MB' },
  { label: '5MB', value: '5MB' },
  { label: '10MB', value: '10MB' },
  { label: '1MB', value: '1MB' },
];
const maxUploadsLimits = [
  { label: 'Select...', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
];

const CollectInputForm = ({ node }: { node: Node<ChatFlowNodesData> }) => {
  const supportedFileType =
    node?.data?.[Chat.supportedFileTypes];

  const { updateNodeData } = useReactFlow();
  const toggleFileType = (type: string) => {
    updateNodeData(node?.id, (prevData: any) => {
      const currentTypes: string[] =
        prevData?.data?.[Chat.supportedFileTypes] ?? [];
      const updatedTypes = currentTypes?.includes(type)
        ? currentTypes?.filter((t) => t !== type)
        : [...currentTypes, type];

      return {
        [Chat.supportedFileTypes]: updatedTypes,
      };
    });
  };

  return (
    <div className="max-w-md rounded-md border  p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-blue-500">🖊️</span>
          <span className="text-lg font-semibold">User Query</span>
        </div>
      </div>

      {/* Title */}
      <input
        className="mt-3 w-full border-b text-lg font-medium  outline-none focus:border-b-blue-700"
        defaultValue={
          node?.data?.[Chat.nodeTitle]
            ? node?.data?.[Chat.nodeTitle]
            : ''
        }
        onChange={(e) => {
          const newTitle = e.target.value ? e.target.value : '';
          updateNodeData(node.id, {
            [Chat.nodeTitle]: newTitle,
          });
        }}
      />

      {/* Subtitle */}
      <div className="mt-1 text-sm text-gray-600">Bot asks this question</div>

      {/* Question Input */}
      <div className="bg-white mt-2 rounded-md border p-2">
        {/* Text Area */}
        <textarea
          className="h-24 w-full resize-none border-none focus:ring-0 p-4 text-xs"
          defaultValue={node.data.message ? node.data.message : ''}
          onChange={(e) => {
            const newMessage = e.target.value ? e.target.value : '';
            updateNodeData(node.id, {
              message: newMessage,
            });
          }}
        />

        {/* Footer */}
        {/* <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>You can reference a variable by typing #</span>
          <span>{question.length}</span>
        </div> */}
      </div>
      <div className="flex gap-1 items-center justify-end mt-2">
        <label htmlFor="allowFileLabel" className="text-sm text-black">
          Allow File
        </label>
        <input
          type="checkbox"
          defaultChecked={node?.data?.allowFile}
          onChange={(e) =>
            updateNodeData(node?.id, {
              allowFile: e.target.checked,
              maxSize: null,
              maxUploads: null,
              supportedFileTypes: null,
            })
          }
        />
      </div>
      {node?.data?.allowFile && (
        <>
          {/* File Type Selection */}
          <div className="mt-4">
            <div className="text-sm font-medium">
              Select supported file type(s)
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {fileTypes.map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={supportedFileType?.includes(type)}
                    onChange={() => toggleFileType(type)}
                    className="h-4 w-4 text-blue-500"
                  />
                  .{type}
                </label>
              ))}
            </div>
          </div>

          {/* File Size Restriction */}
          <div className="mt-4">
            <div className="text-sm font-medium">
              Restrict file size per file
            </div>
            <select
              className="w-full p-2 border rounded-md mt-1 bg-white text-gray-600"
              onChange={(e) =>
                updateNodeData(node?.id, {
                  [Chat.maxSize]: e.target.value,
                })
              }>
              {maxFileSize?.map(({ label, value }) => (
                <option
                  key={value}
                  value={value}
                  selected={value === ''}
                  disabled={value === ''}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Limit */}
          <div className="mt-4">
            <div className="text-sm font-medium">
              Restrict file size per file
            </div>
            <select
              className="w-full p-2 border rounded-md mt-1 bg-white text-gray-600"
              onChange={(e) =>
                updateNodeData(node?.id, {
                  [Chat.maxUploads]: Number(e.target.value),
                })
              }>
              {maxUploadsLimits?.map(({ label, value }) => (
                <option
                  key={value}
                  value={value}
                  selected={value === 0}
                  disabled={value === 0}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default CollectInputForm;
