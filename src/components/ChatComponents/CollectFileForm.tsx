import { ChatFlowNodesData, Chat } from '@/types/enums';
import React, { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import type { Node } from '@xyflow/react';

const CollectFileFrom = ({ node }: { node: Node<ChatFlowNodesData> }) => {
  const { updateNodeData } = useReactFlow();
  // const [uploadLimit, setUploadLimit] = useState(1);

  const title = node?.data?.[Chat.nodeTitle] || '';
  const message = node?.data?.[Chat.nodeMessage];
  const maxSize = node?.data?.[Chat.maxSize];
  const maxUploads = node?.data?.[Chat.maxUploads];
  const supportedFileType =
    node?.data?.[Chat.supportedFileTypes];

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
  // const maxFileSize = ['1MB', '2MB', '3MB', '4MB', '5MB', '10MB'];
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

  // console.log(selectedFileTypes);
  return (
    <div className="p-4 border rounded-md  max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-blue-500">📎</span>
          <span className="text-lg font-semibold">Collect file</span>
          {/* <span className="text-gray-500 text-sm cursor-help">(i)</span> */}
        </div>
        {/* <a href="#" className="text-blue-600 text-sm">How to use</a> */}
      </div>

      {/* Title */}
      <input
        defaultValue={title}
        className="mt-3 w-full border-b text-lg font-medium  outline-none focus:border-b-blue-700"
        onChange={(e) => {
          updateNodeData(node?.id, { title: e.target.value });
        }}
      />

      {/* Subtitle */}
      <div className="mt-1 text-sm text-gray-600">Bot asks this question</div>

      {/* Question Input */}
      <div className="mt-2 border rounded-md p-2 bg-white">
        <div className="mt-2 rounded-md border bg-white-0 p-2">
          <textarea
            className="h-24 w-full resize-none border-none p-2 text-xs focus:ring-0"
            defaultValue={message}
            onChange={(e) => {
              const newMessage = e.target.value ? e.target.value : '';
              updateNodeData(node.id, {
                [Chat.nodeMessage]: newMessage,
              });
            }}
          />
        </div>
        {/* <div className="text-xs text-gray-500 flex justify-between mt-1">
          <span>You can reference a variable by typing #</span>
          <span>{question.length}</span>
        </div> */}
      </div>

      {/* File Type Selection */}
      <div className="mt-4">
        <div className="text-sm font-medium">Select supported file type(s)</div>
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
        <div className="text-sm font-medium">Restrict file size per file</div>
        <select
          className="w-full p-2 border rounded-md mt-1 bg-white text-gray-600"
          defaultValue={maxSize}
          onChange={(e) =>
            updateNodeData(node?.id, {
              [Chat.maxSize]: e.target.value,
            })
          }>
          {maxFileSize?.map(({ label, value }) => (
            <option
              key={value}
              value={value}
              selected={value === maxSize}
              disabled={value === ''}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Limit */}
      <div className="mt-4">
        <div className="text-sm font-medium">Restrict file size per file</div>
        <select
          className="w-full p-2 border rounded-md mt-1 bg-white text-gray-600"
          defaultValue={maxUploads}
          onChange={(e) =>
            updateNodeData(node?.id, {
              [Chat.maxUploads]: Number(e.target.value),
            })
          }>
          {maxUploadsLimits?.map(({ label, value }) => (
            <option
              key={value}
              value={value}
              selected={value === maxUploads}
              disabled={value === 0}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Save Response */}
      {/* <div className="mt-4">
        <div className="text-sm font-medium flex items-center gap-1">
          Save response <span className="text-gray-500 cursor-help">(i)</span>
        </div>
        <select className="w-full p-2 border rounded-md mt-1 bg-white text-gray-400">
          <option>Select variable</option>
        </select>
      </div> */}
    </div>
  );
};

export default CollectFileFrom;
