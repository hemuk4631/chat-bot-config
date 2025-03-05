import { ChatFlowNodesData, Chat } from '@/types/enums';
import { useReactFlow } from '@xyflow/react';
import React from 'react';
import type { Node } from '@xyflow/react';

function ApiNodeForm({ node }: { node: Node<ChatFlowNodesData> }) {
  const { updateNodeData } = useReactFlow();
  const message = node?.data?.[Chat.nodeMessage];
  const apiName = [
    { label: 'All Products', value: 'products' },
    { label: 'Cart Details', value: 'carts' },
  ];
  return (
    <div className="max-w-md rounded-md border  p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-500">💬</span>
          <span className="text-lg font-semibold">API Node</span>
        </div>
      </div>

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
      <div className="text-sm mt-4">
        Bot will send this message with response.
      </div>
      <div className="mt-1 rounded-md border bg-white-0 p-2">
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
      </div>
      <div className="mt-2 rounded-md border bg-white-0 p-2 ">
        <label htmlFor="name" className="text-xs text-black">
          API Name
        </label>
        <select
          name="name"
          id="name"
          defaultValue={node?.data?.value}
          className="w-full resize-none p-2 text-xs focus:ring-0 border rounded-md mb-1"
          onChange={(e) => {
            const newName = e.target.value ? e.target.value : '';
            updateNodeData(node.id, {
              [Chat.name]: apiName?.find((api) => api.value === newName)?.label,
              value: newName,
            });
          }}>
          <option value={''} disabled selected>
            Select...
          </option>
          {apiName?.map((api) => (
            <option value={api.value}>{api.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ApiNodeForm;
