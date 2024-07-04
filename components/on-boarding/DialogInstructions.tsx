"use client";
import React, { useEffect } from "react";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { instructionsSteps } from "@/utils";
import { useDialogInstructions, useDialogItem } from "@/hooks/useDialogs";

const DialogInstructions = () => {
  const [step, setStep] = React.useState(1);

  //we are going to open and close te form dialog
  const { setIsOpen } = useDialogItem();
  const { isOpenInstr, setIsOpenInstr, setDefaultTab } =
    useDialogInstructions();

  useEffect(() => {
    if (isOpenInstr) {
      const elementsToFocus = [
        "mochila",
        "cta",
        "nombreblock",
        "token",
        "capblock",
        "editableblock",
        "calcblock",
        "foureblock",
        "decisionblock",
        "exchangeblock",
        "sectorblock",
        "submit-button",
        "mochila",
      ];
      const elementId = elementsToFocus[step - 1];
      console.log("elementId", elementId);
      const isElementId =
        (step < 3 || step > 12) && document.getElementById(elementId);
      const isElementClassName =
        step > 2 && step < 13 && document.querySelectorAll(`.${elementId}`); // Usa el ID o clase del elemento

      if (isElementId) {
        // Focus the element (generally)
        isElementId.style.position = "relative";
        isElementId.style.zIndex = "1000"; // Mayor que cualquier otro contenido
        isElementId.style.pointerEvents = "auto";
        isElementId.style.border = "3px solid #d9d9d9";
        isElementId.style.backgroundColor = "rgb(43 43 43 / 0.95)"; // Color de fondo resaltado
      }

      //Those elements inside the form (steps 3 - 12)
      //must be resalted differently
      if (isElementClassName) {
        console.log("isElementClassName", isElementClassName);
        for (let i = 0; i < isElementClassName.length; i++) {
          const element = isElementClassName[i] as HTMLElement;
          element.style.position = "relative";
          element.style.zIndex = "1000"; // Mayor que cualquier otro contenido
          element.style.pointerEvents = "auto";
          element.style.border = "3px solid yellow";
          element.style.backgroundColor = "#319383"; // Color de fondo resaltadoe
          element.style.color = "white";
          element.style.borderRadius = "10px";
          element.style.padding = "10px";
        }
      }

      return () => {
        const isElementId =
          (step < 3 || step > 12) && document.getElementById(elementId);
        const isElementClassName =
          step > 2 && step < 12 && document.querySelectorAll(`.${elementId}`); // Usa el ID o clase del elemento

        if (isElementId) {
          isElementId.style.boxShadow = "";
          isElementId.style.position = ""; // O 'relative' dependiendo de tus necesidades
          isElementId.style.zIndex = ""; // Mayor que cualquier otro contenido
          isElementId.style.backgroundColor = ""; // Color de fondo resaltado
          isElementId.style.border = "";
          isElementId.style.pointerEvents = "";
        }
        if (isElementClassName) {
          for (let i = 0; i < isElementClassName.length; i++) {
            const element = isElementClassName[i] as HTMLElement;
            element.style.boxShadow = "";
            element.style.position = ""; // O 'relative' dependiendo de tus necesidades
            element.style.zIndex = ""; // Mayor que cualquier otro contenido
            element.style.backgroundColor = ""; // Color de fondo resaltado
            element.style.border = "";
            element.style.pointerEvents = "";
            element.style.color = "";
            element.style.borderRadius = "";
            element.style.padding = "";
          }
        }
      };
    }
  }, [isOpenInstr, step]);

  const nextStep = () => {
    if (step < instructionsSteps.length - 1) {
      if (step === 2) {
        setIsOpen(true);
        setTimeout(() => setStep(step + 1), 300);
      } else if (step === 7) {
        setDefaultTab("second-part");
        setTimeout(() => setStep(step + 1), 300);
      } else {
        setStep(step + 1);
      }
    } else {
      setIsOpenInstr(false);
    }
  };

  const backStep = () => {
    if (step === 8) {
      setDefaultTab("first-part");
      setStep(step - 1);
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div>
      {isOpenInstr && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 ">
          <div
            className={`
              ${
                step < 3 || step === 13
                  ? "top-[50%] md:top-[38%] md:left-[12%]"
                  : step >= 3 && step < 5
                    ? "top-[50%] md:top-[19%] md:left-[14%]"
                    : step === 5
                      ? "top-[65%] md:top-[19%] md:left-[14%]"
                      : step === 6 || step === 7
                        ? "top-[11%] md:top-[39%] md:left-[14%]"
                        : step === 8 || step === 9
                          ? "top-[60%] md:top-[24%] md:left-[-23%]"
                          : step === 10 || step === 11
                            ? "top-[11%] md:top-[48%] md:left-[-23%]"
                            : step === 12
                              ? "top-[11%] md:top-[48%] md:left-0"
                              : null
              }
              p-4 rounded-lg relative pointer-events-auto bg-dark-grey border-primary border-4 w-96 mx-auto
            `}
          >
            <button onClick={() => setIsOpenInstr(false)}>
              <X size={20} />
            </button>

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-center">
                <span>
                  {instructionsSteps.find((item) => item.id === step)?.title}
                </span>
              </h2>
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-center mb-4">
                <span>
                  {
                    instructionsSteps.find((item) => item.id === step)
                      ?.description
                  }
                </span>
              </p>

              <div className="flex items-center justify-between">
                {step > 3 && step !== 13 ? (
                  <Button onClick={backStep} variant={"outline"}>
                    Atras
                  </Button>
                ) : (
                  <div></div>
                )}

                <Button onClick={nextStep}>
                  {step < instructionsSteps.length - 1 ? "Siguiente" : "Listo!"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogInstructions;
