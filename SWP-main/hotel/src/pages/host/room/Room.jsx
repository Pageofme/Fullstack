import { Outlet } from "react-router-dom";

export default function Room() {
  return (
    <div className="p-4">
      <Outlet /> 
    </div>
  );
}
