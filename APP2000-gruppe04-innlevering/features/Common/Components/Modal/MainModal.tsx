import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
} from "@nextui-org/react";

export interface InputConfig {
  label: string;
  placeholder: string;
  validations: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
  type: string;
}
interface ModalProps {
  inputConfigs: InputConfig[];
  onSubmit: (data: Record<string, any>) => void;
  submitLabel: string;
}
type ValidateInput = (
  value: string,
  validations: InputConfig["validations"]
) => string | null;

const MainModal: React.FC<ModalProps> = ({
  inputConfigs,
  onSubmit,
  submitLabel,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isOpen, setOpen] = useState(true);

  const onclose = () => {
    setOpen(false);
  };
  // Generic validation function
  const validateInput: ValidateInput = (value, validations) => {
    if (validations.required && !value) return "This field is required";
    if (validations.minLength && value.length < validations.minLength)
      return `Minimum length is ${validations.minLength}`;
    if (validations.maxLength && value.length > validations.maxLength)
      return `Maximum length is ${validations.maxLength}`;
    return null; // No errors
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    config: InputConfig
  ) => {
    const { value } = e.target;
    const error = validateInput(value, config.validations);
    setFormData({ ...formData, [config.label]: value });
    setErrors({ ...errors, [config.label]: error });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      isOpen={isOpen}
      onClose={onclose}
      backdrop="blur"
      style={{ width: "70%" }}
    >
      <ModalContent>
        <ModalHeader>
          <h1 id="modal-title">Fill the Form</h1>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            {inputConfigs.map((config, index) => (
              <div key={index}>
                <Input
                  fullWidth
                  color="primary"
                  size="lg"
                  className="mb-5"
                  placeholder={config.placeholder}
                  label={config.label}
                  onChange={(e) => handleChange(e, config)}
                  errorMessage={errors[config.label]}
                />
              </div>
            ))}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={(e) => onclose}>
            Close
          </Button>
          <Button
            type="submit"
            disabled={Object.values(errors).some((error) => error !== null)}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {submitLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MainModal;
