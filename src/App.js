import React, { useState } from "react";

// Example fileData array
const fileData = [
  { id: 1, name: "README.md" },
  { id: 5, name: "SS", children:[
    {id: 6, name:"sudhanshu"},
      {id: 7, name: "SSt", children:[{
        id: 8, name: "shresth"
      },
      {
        id:9, name:"s123"
      }
      ]
    }
  ] }, 
  {
    id: 2,
    name: "Documents",
    children: [
      { id: 3, name: "Word.doc" },
      { id: 4, name: "Powerpoint.ppt" },
    ],
  },
];

const FileTree = ({ data }) => {
  const [expandedIds, setExpandedIds] = useState(new Set());

  const toggle = (id) => {
    setExpandedIds(
      (prev) =>
        new Set(
          prev.has(id) ? [...prev].filter((x) => x !== id) : [...prev, id]
        )
    );
  };

  const renderTree = (items, depth = 0) => {
    return items
      .sort((a, b) =>
        a.children
          ? b.children
            ? a.name.localeCompare(b.name)
            : -1
          : b.children
          ? 1
          : a.name.localeCompare(b.name)
      )
      .map((item) => (
        <div key={item.id} style={{ marginLeft: `${20 * depth}px` }}>
          {item.children ? (
            <div onClick={() => toggle(item.id)}>
              {expandedIds.has(item.id) ? "[-]" : "[+]"} {item.name}
            </div>
          ) : (
            <div>{item.name}</div>
          )}
          {item.children &&
            expandedIds.has(item.id) &&
            renderTree(item.children, depth + 1)}
        </div>
      ));
  };

  return <div>{renderTree(data)}</div>;
};

function App() {
  return <FileTree data={fileData} />;
}

export default App;
