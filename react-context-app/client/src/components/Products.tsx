interface ProductsProps {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: number) => void;
}

export default function Products({
  name,
  imagePath,
  updateItemCount,
}: ProductsProps) {
  // console.log(name, imagePath);
  const handleChange = (event: { target: { value: any } }) => {
    updateItemCount(name, Number(event.target.value));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:4000/${imagePath}`}
        alt={`${name} product`}
      />
      <form style={{ marginTop: "10px" }}>
        <label style={{ textAlign: "right" }}>{name}</label>
        <input
          style={{ marginLeft: 7 }}
          type="number"
          name="quantity"
          min="0"
          defaultValue={0}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
