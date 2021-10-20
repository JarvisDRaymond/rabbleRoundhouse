const ItemData = (props) => {
  // Output JSX for Component
  return (
    <>
      <td>
        <input
          type="checkbox"
          value={props.item.path}
          checked={props.item.checked}
          onChange={props.onChange}
        ></input>
      </td>
      <td>{props.item.name}</td>
      <td>{props.item.device}</td>
      <td>{props.item.path}</td>
      <td
        className={`${props.item.status === "available" ? "available" : "scheduled"}`}
      >
        {props.item.status}
      </td>
    </>
  );
};

export default ItemData;
