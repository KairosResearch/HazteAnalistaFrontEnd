import React, { useEffect } from "react";
import { CustomField } from './CustomField';
import { Input } from "../../ui/input";

interface EditablePrecioProps {
  type: "create" | "update" | null;
  editablePrecio: number;
  setEditablePrecio: any;
}

const EditablePrecio = ({
  type,
  editablePrecio,
  setEditablePrecio,
}: EditablePrecioProps) => {
  return (
    <div className="editableblock">
      {/**Precio entrada */}
      {type === "create" ? (
        <CustomField
          type={type}
          name="precioEntrada"
          formLabel="Precio entrada"
          className="w-full"
          render={({ field }) => (
            <>
              <div className="flex items-center gap-1 justify-stretch">
                <span>$</span>
                <Input
                  {...field}
                  type="text"
                  value={
                    editablePrecio != undefined ? String(editablePrecio) : " "
                  }
                  onChange={(e) => {
                    setEditablePrecio(Number(e.target.value));
                    field.value === Number(e.target.value);
                  }}
                />
                <span>USD</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Precio: $ {editablePrecio?.toLocaleString()} USD
              </p>
            </>
          )}
        />
      ) : (
        <CustomField
          type={type}
          name="precioEntrada"
          formLabel="Precio entrada"
          className="w-full"
          render={({ field }) => (
            <>
              <div className="flex items-center gap-1 justify-stretch">
                <span>$</span>
                <Input
                  {...field}
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
                <span>USD</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Precio: $ {field.value.toLocaleString()} USD
              </p>
            </>
          )}
        />
      )}
    </div>
  );
};

export default EditablePrecio;
