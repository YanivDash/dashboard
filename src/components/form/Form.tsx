import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Modal,
  Text,
  Input,
  Title,
  MultiSelect,
  AdvancedCheckbox,
  Button,
  ActionIcon,
} from "rizzui";
import { MdOutlineClose } from "react-icons/md";
import { adminTeamsData } from "@/siteConfig/adminTeamsData";

const schema = z.object({
  emails: z
    .array(
      z.object({
        email: z.string().email({ message: "Invalid email address" }),
      })
    )
    .min(1, { message: "At least one email is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  role: z
    .array(z.string())
    .min(1, { message: "At least one role is required" }),
  warehouse: z
    .array(z.string())
    .min(1, { message: "At least one warehouse is required" }),
});

const warehouseOptions = [
  { label: "Main Warehouse", value: "main-warehouse" },
  { label: "Local Warehouse", value: "local-warehouse" },
];

const roleOptions = [
  { label: "Warehouse", value: "warehouse" },
  { label: "Employee", value: "employee" },
  { label: "Logistic", value: "logistic" },
  { label: "Manager", value: "manager" },
];

type SchemaType = z.infer<typeof schema>;

export default function Form() {
  const [modalState, setModalState] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    defaultValues: {
      emails: [{ email: "" }],
      warehouse: [],
      role: [],
    },
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  });
  const onSubmit = (data: SchemaType) => {
    console.log("Submitted data", data);
    const newTeamMember = {
      id: (adminTeamsData.length + 1).toString(), // Create a new ID
      name: data.name,
      role: data.role.join(", "), // Convert array of roles to a string
      email: data.emails.map((emailObj) => emailObj.email).join(", "), // Join multiple emails
      status: "Active", // Set default status to Active, or you can add it in the form
      warehouse: data.warehouse.join(", "), // Convert array of warehouses to a string
    };

    // Add the new member to the existing team data
    adminTeamsData.push(newTeamMember);
    console.log("Updated Teams Data: ", adminTeamsData);
    setModalState(false);
  };

  return (
    <>
      <Button onClick={() => setModalState(true)}>+ Team</Button>
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="m-auto px-7 pt-6 pb-8">
          <div className="mb-7 flex items-center justify-between">
            <Text as="p">Welcome to RizzUi</Text>
            <ActionIcon
              size="sm"
              variant="text"
              onClick={() => setModalState(false)}
            >
              <MdOutlineClose className="h-auto w-6" strokeWidth={1.8} />
            </ActionIcon>
          </div>
          <div className="w-full max-w-2xl mb-10">
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-y-6 items-end"
            >
              <div>
                <div className="grid grid-cols-1 gap-x-6 items-end">
                  <Input
                    label="Name"
                    placeholder="John Doe"
                    {...register("name")}
                    error={errors.name?.message}
                  />
                </div>
              </div>

              <div>
                <Text className="font-thin text-sm mb-2">Select Warehouse</Text>
                <div className="grid grid-cols-2 gap-6">
                  {warehouseOptions.map((i) => (
                    <AdvancedCheckbox
                      key={i.value}
                      value={i.value}
                      contentClassName="p-4"
                      {...register("warehouse")}
                    >
                      <Title as="h4" className=" text-sm font-thin">
                        {i.label}
                      </Title>
                    </AdvancedCheckbox>
                  ))}
                </div>
              </div>

              <Controller
                control={control}
                name="role"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <MultiSelect
                    value={value}
                    label="Select Role"
                    options={roleOptions}
                    onChange={(selectedValues: string[]) =>
                      onChange(selectedValues)
                    }
                    error={error?.message}
                    displayValue={(selected: string[]) =>
                      selected
                        .map(
                          (value) =>
                            roleOptions.find((option) => option.value === value)
                              ?.label
                        )
                        .join(", ")
                    }
                  />
                )}
              />

              <div>
                <Text className="font-thin mb-4">Add Email</Text>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center mb-4">
                    <Input
                      type="email"
                      placeholder="person@mail.com"
                      {...register(`emails.${index}.email`)} // Access the email property
                      error={errors.emails?.[index]?.email?.message}
                    />
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      className="ml-2"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => append({ email: "" })}>
                  Add Email
                </Button>
              </div>

              <Button type="submit" className="w-full mt-2">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
