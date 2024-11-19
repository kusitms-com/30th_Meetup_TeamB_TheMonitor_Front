import { ArrowBeforeThick, CloseIcon } from "@assets/svgs";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

type AddModalFormData = {
  companyName: string;
  personInCharge: string;
  uploadingImg?: File;
  keywordsByCategory: {
    SELF: string[];
    COMPETITOR: string[];
    INDUSTRY: string[];
  };
  recipientEmails: string[];
  referenceEmails?: string[];
};

interface AddModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const methods = useForm<AddModalFormData>({ mode: "onChange" });

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit: SubmitHandler<AddModalFormData> = (data) => {
    console.log(data);
    onSubmit();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65">
      <div className="relative h-[707px] w-[580px] bg-white pt-20">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            {step !== 1 && (
              <ArrowBeforeThick
                className="absolute left-[24px] top-[20px] m-1 cursor-pointer"
                onClick={handlePreviousStep}
              />
            )}
            <CloseIcon
              type="button"
              className="absolute right-[22px] top-[22px] cursor-pointer fill-neutral-700"
              onClick={onClose}
            />

            <div className="relative h-[627px] w-full overflow-hidden">
              <div
                className={`absolute h-full w-full transition-transform duration-300 ${
                  step === 1 ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <Step1 handleNext={handleNextStep} />
              </div>
              <div
                className={`absolute h-full w-full transition-transform duration-300 ${
                  step === 2
                    ? "translate-x-0"
                    : step < 2
                      ? "translate-x-full"
                      : "-translate-x-full"
                }`}
              >
                <Step2 handleNext={handleNextStep} />
              </div>
              <div
                className={`absolute h-full w-full transition-transform duration-300 ${
                  step === 3
                    ? "translate-x-0"
                    : step < 3
                      ? "translate-x-full"
                      : "-translate-x-full"
                }`}
              >
                <Step3 />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddModal;
