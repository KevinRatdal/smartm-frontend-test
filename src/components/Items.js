import React from "react";

class Items extends React.Component {
  projectIsSelected() {
    if (this.props.selectedProject !== "") {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  renderTableHeader() {
    let header = processmetadata(this.props.metadata);
    return header.map((entry) => {
      return <th key={entry.id}>{entry.name}</th>;
    });
  }
  renderTableBody() {
    let processedMetadata = processmetadata(this.props.metadata);
    let items = this.props.currentitems 
    return  items.map((item) => {
      return (
        <Item
          key={item["epcString"]}
          item={item}
          metadata={processedMetadata}
          onClick={() => this.props.changeItem(item["epcString"])}
        />
      );
    }) 
  }

  renderMeta() {
    const metadata = this.props.metadata;
    if (metadata.length > 0) {
      //let processed = processmetadata(metadata)
      return (
        <table>
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>
            {this.renderTableBody()}
          </tbody>
        </table>
      );
      //return JSON.stringify(this.props.metadata);
    }
  }

  render() {
    return (
      <div className="Items">
        {this.projectIsSelected() && <h1 id="itemsTitle">Items</h1>}
        {this.renderMeta()}
      </div>
    );
  }
}

export default Items;


function Item(props) {
  return (
    <tr onClick={props.onClick}
        id={props.item["epcString"]}
        key={props.item["epcString"]}>
      {props.metadata.map((entry) => {
        return <td key={entry.id}>{props.item[entry.id]}</td>;
      })}
    </tr>
  );
}


function processmetadata(meta) {
  let metadata = meta.map((x) => x);
  metadata = metadata.filter(entry => (allowed.includes(entry.name) || allowed.includes(entry.servicetype)))
  
  console.log(metadata);
  return metadata;
}

const allowed = [
  "Epc",
  "String",
  "Text",
  "Integer",
  "Float",
  "Date",
  "Datetime",
  "Boolean",
];