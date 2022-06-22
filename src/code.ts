export {};

import axios from 'axios';

function main(data: any) {

  let frames = data.document.children[0].children;  //hardcoded 0 to consider the first page of the figma file we got through HTTP
  //parse all top level pages into treeNodes and hashTable
      for(let i = 0; i < frames.length; i++) {
        let node = frames[i];
        if(node.type === "FRAME") {
          let rootNode = new TreeNode(node.type,node.id);
          topLevelFrames.push(rootNode);
          hashTable.set(node.id,node);
        }
      }
  //recursively parse all subcomponents for each page into treeNodes and hashTable
      topLevelFrames.forEach(treeNode => {
        let data = hashTable.get(treeNode.id);
        recursivelyParse(treeNode,data);
      });
}



function recursivelyParse(treeNode: TreeNode,data: any) {
  if(!data.hasOwnProperty('children')) {
    return;
  }
  let children:Array<any>;
  children = data.children;
  for(let i = 0; i < children.length; i++) {
    let childData = children[i];
    let childTreeNode = new TreeNode(childData.type,childData.id);
    treeNode.subComponents.push(childTreeNode);
    hashTable.set(childData.id,childData);
    recursivelyParse(childTreeNode,childData);
  }
}

async function getFileInfo() {
  const url:string = "https://api.figma.com/v1/files/" + key;
    const res = await axios.get(url, {
      headers: {
        'X-Figma-Token': 'figd_JQtIB0OjlOxXLs0MrQ6_1CUqmqgwbmY3Gg2hX2DB'
      }
    });
    console.log(res.data);
    return res.data;
  }




const key:string = figma.fileKey;
const hashTable = new Map();
const topLevelFrames = []; //this is an array of treeNodes
 class TreeNode {
type: String;
id: String;
subComponents: Array<TreeNode>
constructor(type: string, id: string) {
  this.type = type;
  this.id = id;
  this.subComponents = [];
}
 }
const data:any = async () => {
  await getFileInfo();
};
main(data);

figma.closePlugin();


// This plugin creates 5 shapes and 5 connectors

// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
/*
const numberOfShapes = 5

const nodes: SceneNode[] = [];
for (let i = 0; i < numberOfShapes; i++) {
  const shape = figma.createShapeWithText();
  // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
  shape.shapeType = 'ROUNDED_RECTANGLE'
  shape.x = i * (shape.width + 200);
  shape.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
  figma.currentPage.appendChild(shape);
  nodes.push(shape);
};

for (let i = 0; i < (numberOfShapes - 1); i++) {
  const connector = figma.createConnector();
  connector.strokeWeight = 8

  connector.connectorStart = {
    endpointNodeId: nodes[i].id,
    magnet: 'AUTO',
  };

  connector.connectorEnd = {
    endpointNodeId: nodes[i+1].id,
    magnet: 'AUTO',
  };
};

figma.currentPage.selection = nodes;
figma.viewport.scrollAndZoomIntoView(nodes);

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
*/