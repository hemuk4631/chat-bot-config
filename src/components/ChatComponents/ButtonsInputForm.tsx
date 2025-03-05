

import { Chat } from '@/types/enums';
import { useReactFlow } from '@xyflow/react';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';

function ButtonsInputForm({ node, nodes, edges }) {
  const { updateNodeData, addNodes, deleteElements, addEdges } = useReactFlow();
  const [connectedNodes, setConnectedNodes] = useState([{}]);
  // const { updateNodeData } = useReactFlow();
  const message = node?.data?.[Chat.nodeMessage];
  // const { getEdges, getNodes } = useReactFlow();

  useEffect(() => {
    const getConnectedNodes = (nodeId) => {
      // Find outgoing edges from the selected node
      const outgoingEdges = edges?.filter((edge) => edge.source === nodeId);

      // Get target nodes from those edges
      const nodeConnected = nodes?.filter((node) =>
        outgoingEdges.some((edge) => edge.target === node.id)
      );

      setConnectedNodes(nodeConnected);
    };
    getConnectedNodes(node.id);
  }, [nodes, node.id, deleteElements, addNodes, addEdges]);

  // const connectedNodes = useConnectedNodes(node?.id);

  // Add a new decision node
  const onAddOption = () => {
    const newNode = {
      id: nanoid(),
      type: Chat.button,
      position: {
        x: connectedNodes[(connectedNodes?.length ?? 0) - 1]?.position?.x + 100,
        y: connectedNodes[0]?.position?.y,
      },
      data: {
        [Chat.nodeTitle]: `New Option`,
      },
    };

    addNodes(newNode);
    addEdges({
      id: nanoid(),
      source: node?.id,
      target: newNode.id,
    });
  };

  // Remove a decision node
  const onRemoveOption = (ele) => {
    deleteElements({ nodes: [ele] });
  };
  return (
    <div className="max-w-md rounded-md border  p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-500">💬</span>
          <span className="text-lg font-semibold">Options</span>
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

      <div className="mt-1 text-sm text-gray-600">Bot asks this Question</div>

      <div className="mt-2 rounded-md border bg-white-0 p-2">
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
      <div className="bg-white-0  rounded-md">
        <h2 className="mt-1 text-sm text-gray-600">Options buttons to be shown</h2>
        {connectedNodes?.map((ele) => (
          <div key={ele?.id} className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              className="bg-blue-c2 text-center text-white-0 outline-none w-full rounded-md p-2"
              defaultValue={ele?.data?.[Chat.nodeTitle] || ''}
              onChange={(e) => {
                const newTitle = e.target.value;

                // Update the title in the specific node
                updateNodeData(ele?.id, {
                  [Chat.nodeTitle]: newTitle,
                });
              }}
            />
            <img
              src="/delete.svg"
              onClick={() => onRemoveOption(ele)}
              className={`cursor-pointer ${connectedNodes?.length<2 && 'hidden'}`}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={onAddOption}
            className="mt-2 bg-white-100 text-sm text-white p-2 rounded">
            + Add Option
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonsInputForm;
