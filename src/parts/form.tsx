// Share Id Application List
// 	•	Latest Photo(image)
// 	•	Customer Id(number)
// 	•	Share Account Number(alphanumeric)
// 	•	Member Name(text)
// 	•	Father Name(text)
// 	•	Mother Name(text)
// 	•	Marital Status(radio)
// 	•	Spouse Name(text)

// 	•	Gender(radio)
// 	•	Date of Birth(calendar)
// 	•	Present Address(multiple  line text)
// 	•	Permanent Address(multiple  line text)

// 	•	Mobile No(10 NO’S validation)
// 	•	Alternative Mobile No/Land Line(10 NO’S validation)

// 	•	Email id(VALIDATION)

// 	•	Id Proof(PAN/AADHAR/VOTER ID/DRIVING LICENSE)(Based on length validation)

// 	•	Education Qualification(drop down)
// 	•	Profession(drop down)
// 	•	Office Address(multiple  line text)
// 	•	Annual  income(drop down)
// 	•	Date of Joining(calendar)
// 	•	Share Purpose(Loan/Deposit/Primary Applicant /Co-Applicant / Co-borrower /Surety)(drop down)
// 	•	No of shares(drop down)
// 	•	Share amount(number)
// 	•	Dividend Transfer account number(Text)
// 	•	Medical claim Required  (Yes/No)   (radio)
// 	•	Death claim required (Yes/No)(radio)
// 	•	Family Member Shares Details(Individual/Group)(radio)
// 	•	Family Indicator(unique id)
// 	•	Name of the family member(text)
// 	•	Relationship of the  group member(drop down)
// 	•	Cash awards/Education allowances (check box)
// 	•	Voting Rate (Yes/No) (radio)
// 	•	Member Position in Bank(Director/Commit/Staff/General)(drop down)

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useState } from "react";

// const MAX_IMAGE_SIZE = 5242880; // 5 MB
// const ALLOWED_IMAGE_TYPES = [
//     "image/jpeg",
//     "image/png",
//     "image/webp",
//     "image/jpg",
// ];

const formSchema = z.object({
    // latestPhoto: z
    //     .custom<FileList>((val) => val instanceof FileList, "Required")
    //     .refine((files) => files.length === 1, `Only one image is allowed.`)
    //     .refine(
    //         (files) =>
    //             Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
    //         `File size should be less than 5 MB.`
    //     )
    //     .refine(
    //         (files) =>
    //             Array.from(files).every((file) =>
    //                 ALLOWED_IMAGE_TYPES.includes(file.type)
    //             ),
    //         "Only these types are allowed .jpg, .jpeg, .png and .webp"
    //     ),
    customerId: z.string(),
    shareAccountNumber: z.string().regex(/^[a-zA-Z0-9]*$/), // Alphanumeric
    memberName: z.string(),
    fatherName: z.string(),
    motherName: z.string(),
    maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]),
    spouseName: z.string().optional(),
    gender: z.enum(["Male", "Female", "Other"]),
    dateOfBirth: z.date(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    mobileNo: z.string().length(10),
    alternativeMobileNo: z.string().length(10).optional(),
    emailId: z.string().email(),
    idProof: z
        .string()
        .refine((data) =>
            ["PAN", "AADHAR", "VOTER ID", "DRIVING LICENSE"].includes(data)
        ),
    educationQualification: z.enum([
        "High School",
        "Bachelor",
        "Master",
        "PhD",
        "Other",
    ]),
    profession: z.enum([
        "Student",
        "Employed",
        "Self-Employed",
        "Unemployed",
        "Retired",
        "Other",
    ]),
    officeAddress: z.string(),
    annualIncome: z.enum(["<20k", "20k-50k", "50k-100k", ">100k"]),
    dateOfJoining: z.date(),
    sharePurpose: z.enum([
        "Loan",
        "Deposit",
        "Primary Applicant",
        "Co-Applicant",
        "Co-borrower",
        "Surety",
    ]),
    noOfShares: z.enum(["1", "2", "3", "4", "5", "More"]),
    shareAmount: z.string(),
    dividendTransferAccountNumber: z.string(),
    medicalClaimRequired: z.enum(["Yes", "No"]),
    deathClaimRequired: z.enum(["Yes", "No"]),
    familyMemberSharesDetails: z.enum(["Individual", "Group"]),
    familyIndicator: z.string(),
    nameOfFamilyMember: z.string(),
    relationshipOfGroupMember: z.enum([
        "Parent",
        "Sibling",
        "Spouse",
        "Child",
        "Other",
    ]),
    cashAwardsEducationAllowances: z.boolean(),
    votingRate: z.enum(["Yes", "No"]),
    memberPositionInBank: z.enum(["Director", "Committee", "Staff", "General"]),
});

export function ProfileForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    const [formStage, setformStage] = useState(0);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* <FormField
                    name="latestPhoto"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Latest Photo</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        multiple={false}
                                        disabled={form.formState.isSubmitting}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Upload your latest photo.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                /> */}
                {formStage === 0 && (
                    <div className="max-w-4xl mx-auto">
                        <section className="grid grid-cols-2 gap-12 ">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="latestPhoto">
                                    Latest Photo
                                </Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple={false}
                                    disabled={form.formState.isSubmitting}
                                    id="latestPhoto"
                                />
                                <FormDescription>
                                    Upload your latest photo.
                                </FormDescription>
                            </div>
                            <FormField
                                control={form.control}
                                name="customerId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Customer ID</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your customer ID.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="shareAccountNumber"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Share Account Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your share account number.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="memberName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Member Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your member name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="fatherName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Father Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your father name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="motherName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mother Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your mother name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="gender"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Male" />
                                                    </FormControl>
                                                    <FormLabel>Male</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Female" />
                                                    <FormLabel>
                                                        Female
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Other" />
                                                    <FormLabel>Other</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Select your gender.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date of birth</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Enter your date of birth.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="maritalStatus"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Marital Status</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Single" />
                                                    </FormControl>
                                                    <FormLabel>
                                                        Single
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Married" />
                                                    <FormLabel>
                                                        Married
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Divorced" />
                                                    <FormLabel>
                                                        Divorced
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Widowed" />
                                                    <FormLabel>
                                                        Widowed
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your marital status.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* {Based on martial status display the following field} */}
                            {form.watch("maritalStatus") === "Married" && (
                                <FormField
                                    name="spouseName"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Spouse Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Enter your spouse name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </section>
                        <Button
                            className="min-w-[256px] mt-8 ml-auto"
                            onClick={() => setformStage(1)}
                        >
                            Next
                        </Button>
                    </div>
                )}

                {formStage === 1 && (
                    <div className="max-w-4xl mx-auto">
                        <section className="grid grid-cols-2 gap-12 ">
                            <FormField
                                name="presentAddress"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Present Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your present address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="permanentAddress"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Permanent Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your permanent address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="mobileNo"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mobile Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your mobile number.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="alternativeMobileNo"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Alternative Mobile Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your alternative mobile
                                            number.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="emailId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email ID</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your email ID.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="idProof"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ID Proof</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="PAN" />
                                                    </FormControl>
                                                    <FormLabel>PAN</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="AADHAR" />
                                                    <FormLabel>
                                                        AADHAR
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="VOTER ID" />
                                                    <FormLabel>
                                                        VOTER ID
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="DRIVING LICENSE" />
                                                    <FormLabel>
                                                        DRIVING LICENSE
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your ID proof.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="educationQualification"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Education Qualification
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="High School" />
                                                    </FormControl>
                                                    <FormLabel>
                                                        High School
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Bachelor" />
                                                    <FormLabel>
                                                        Bachelor
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Master" />
                                                    <FormLabel>
                                                        Master
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="PhD" />
                                                    <FormLabel>PhD</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Other" />
                                                    <FormLabel>Other</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your education qualification.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>
                        <section className="flex justify-between items-center">
                            <Button
                                variant="secondary"
                                className="min-w-[256px] mt-8 mr-auto"
                                onClick={() => setformStage(0)}
                            >
                                Back
                            </Button>
                            <Button
                                className="min-w-[256px] mt-8 ml-auto"
                                onClick={() => setformStage(2)}
                            >
                                Next
                            </Button>
                        </section>
                    </div>
                )}
                {formStage === 2 && (
                    <div className="max-w-4xl mx-auto">
                        <section className="grid grid-cols-2 gap-12 ">
                            <FormField
                                name="profession"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profession</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Student" />
                                                    </FormControl>
                                                    <FormLabel>
                                                        Student
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Employed" />
                                                    <FormLabel>
                                                        Employed
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Self-Employed" />
                                                    <FormLabel>
                                                        Self-Employed
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Unemployed" />
                                                    <FormLabel>
                                                        Unemployed
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Retired" />
                                                    <FormLabel>
                                                        Retired
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Other" />
                                                    <FormLabel>Other</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your profession.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="officeAddress"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Office Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your office address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="annualIncome"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Annual Income</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="<20k" />
                                                    </FormControl>
                                                    <FormLabel>
                                                        {"<20k"}
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="20k-50k" />
                                                    <FormLabel>
                                                        20k-50k
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="50k-100k" />
                                                    <FormLabel>
                                                        50k-100k
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value=">100k" />
                                                    <FormLabel>
                                                        {">100k"}
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your annual income.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateOfJoining"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date of joining</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Enter your date of joining.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="sharePurpose"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Share Purpose</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Loan" />
                                                    </FormControl>
                                                    <FormLabel>Loan</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Deposit" />
                                                    <FormLabel>
                                                        Deposit
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Primary Applicant" />
                                                    <FormLabel>
                                                        Primary Applicant
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Co-Applicant" />
                                                    <FormLabel>
                                                        Co-Applicant
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Co-borrower" />
                                                    <FormLabel>
                                                        Co-borrower
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="Surety" />
                                                    <FormLabel>
                                                        Surety
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your share purpose.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="noOfShares"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>No of Shares</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="1" />
                                                    </FormControl>
                                                    <FormLabel>1</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="2" />
                                                    <FormLabel>2</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="3" />
                                                    <FormLabel>3</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="4" />
                                                    <FormLabel>4</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="5" />
                                                    <FormLabel>5</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="More" />
                                                    <FormLabel>More</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your number of shares.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="shareAmount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Share Amount</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your share amount.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="dividendTransferAccountNumber"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Dividend Transfer Account Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your dividend transfer account
                                            number.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>
                        <section className="flex justify-between items-center">
                            <Button
                                variant="secondary"
                                className="min-w-[256px] mt-8 mr-auto"
                                onClick={() => setformStage(1)}
                            >
                                Back
                            </Button>
                            <Button
                                className="min-w-[256px] mt-8 ml-auto"
                                onClick={() => setformStage(3)}
                            >
                                Next
                            </Button>
                        </section>
                    </div>
                )}
                {formStage === 3 && (
                    <div className="max-w-4xl mx-auto">
                        <section className="grid grid-cols-2 gap-12 ">
                            <FormField
                                name="medicalClaimRequired"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Medical Claim Required
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Yes" />
                                                    </FormControl>
                                                    <FormLabel>Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="No" />
                                                    <FormLabel>No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your medical claim
                                            requirement.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="deathClaimRequired"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Death Claim Required
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Yes" />
                                                    </FormControl>
                                                    <FormLabel>Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="No" />
                                                    <FormLabel>No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your death claim requirement.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="familyMemberSharesDetails"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Family Member Shares Details
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value="Individual"
                                                            className="flex items-center space-x-3 space-y-0"
                                                        />
                                                    </FormControl>
                                                    <FormLabel>
                                                        Individual
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem
                                                        value="Group"
                                                        className="flex items-center space-x-3 space-y-0"
                                                    />
                                                    <FormLabel>Group</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your family member shares
                                            details.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="familyIndicator"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Family Indicator</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your family indicator.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="nameOfFamilyMember"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name of Family Member
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your name of family member.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="relationshipOfGroupMember"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Relationship of Group Member
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value="Parent"
                                                            className="flex items-center space-x-3 space-y-0"
                                                        />
                                                    </FormControl>
                                                    <FormLabel>
                                                        Parent
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem
                                                        value="Sibling"
                                                        className="flex items-center space-x-3 space-y-0"
                                                    />
                                                    <FormLabel>
                                                        Sibling
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem
                                                        value="Spouse"
                                                        className="flex items-center space-x-3 space-y-0"
                                                    />
                                                    <FormLabel>
                                                        Spouse
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem
                                                        value="Child"
                                                        className="flex items-center space-x-3 space-y-0"
                                                    />
                                                    <FormLabel>Child</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem
                                                        value="Other"
                                                        className="flex items-center space-x-3 space-y-0"
                                                    />
                                                    <FormLabel>Other</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your relationship of group
                                            member.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="cashAwardsEducationAllowances"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Cash Awards/Education Allowances
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="votingRate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Voting Rate</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Yes" />
                                                    </FormControl>
                                                    <FormLabel>Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem value="No" />
                                                    <FormLabel>No</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your voting rate.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="memberPositionInBank"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Member Position in Bank
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value="Director"
                                                            className="flex items-center space-x-3 space-y-0"
                                                        />
                                                    </FormControl>
                                                    <FormLabel>
                                                        Director
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem
                                                        value="Committee"
                                                        className="flex items-center space-x-3 space-y-0"
                                                    />
                                                    <FormLabel>
                                                        Committee
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem
                                                        value="Staff"
                                                        className="flex items-center space-x-3 space-y-0"
                                                    />
                                                    <FormLabel>Staff</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <RadioGroupItem
                                                        value="General"
                                                        className="flex items-center space-x-3 space-y-0"
                                                    />
                                                    <FormLabel>
                                                        General
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your member position in bank.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>
                        <section className="flex justify-between items-center">
                            <Button
                                variant="secondary"
                                className="min-w-[256px] mt-8 mr-auto"
                                onClick={() => setformStage(2)}
                            >
                                Back
                            </Button>
                            <Button
                                className="min-w-[256px] mt-8 ml-auto"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </section>
                    </div>
                )}
            </form>
        </Form>
    );
}
