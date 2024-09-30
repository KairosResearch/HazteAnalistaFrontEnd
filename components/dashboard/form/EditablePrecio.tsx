//Imports for the component.
//React
import React from "react";
import { CustomField } from "../../shared/CustomField";
//Input
import { Input } from "../../ui/input";

interface EditablePrecioProps {
  type: "create" | "update" | null;
  editablePrecio: string;
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
          className="w-9/12 md:w-full"
          render={({ field }) => (
            <>
              <div className="flex items-center gap-1 justify-stretch">
                <span>$</span>
                <Input
                  className="border border-grey-light rounded-md "
                  {...field}
                  type="text"
                  pattern="^[0-9]+([,.][0-9]+){0,7}?$"
                  value={editablePrecio}
                  onChange={(e) => {
                    const valorFiltrado = e.target.value.replace(
                      /[^0-9.,]+/,
                      "",
                    );
                    setEditablePrecio(valorFiltrado);
                    field.value === valorFiltrado;
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
                  pattern="^[0-9]+([,.][0-9]+){0,7}?$"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/[^0-9.,]+/, ""));
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
