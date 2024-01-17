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

// 	•	Office Address(multiple  line text)
// 	•	Date of Joining(calendar)
// 	•	Share amount(number)
// 	•	Dividend Transfer account number(Text)
// 	•	Medical claim Required  (Yes/No)   (radio)
// 	•	Death claim required (Yes/No)(radio)
// 	•	Family Member Shares Details(Individual/Group)(radio)
// 	•	Family Indicator(unique id)
// 	•	Name of the family member(text)
// 	•	Education Qualification(drop down)
// 	•	Profession(drop down)
// 	•	Annual  income(drop down)
// 	•	Share Purpose(Loan/Deposit/Primary Applicant /Co-Applicant / Co-borrower /Surety)(drop down)
// 	•	No of shares(drop down)
// 	•	Relationship of the  group member(drop down)
// 	•	Member Position in Bank(Director/Commit/Staff/General)(drop down)
// 	•	Cash awards/Education allowances (check box)
// 	•	Voting Rate (Yes/No) (radio)

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

const MAX_IMAGE_SIZE = 500000; // 5 KB

const formSchema = z.object({
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

    const { toast } = useToast();

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        console.log(latestPhoto);
    }
    const [formStage, setformStage] = useState(0);
    const [latestPhoto, setLatestPhoto] = useState<File | null>(null);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {formStage === 0 && (
                    <div className="max-w-4xl mx-auto">
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
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
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        const fsize = file?.size;
                                        if (fsize && fsize > MAX_IMAGE_SIZE) {
                                            toast({
                                                title: "Error: File is too big",
                                                description:
                                                    "File should be less than 500KB",
                                                variant: "destructive",
                                            });
                                            // clear the file input
                                            e.target.value = "";
                                            return;
                                        }
                                        if (file) {
                                            setLatestPhoto(file);
                                        }
                                    }}
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
                            className="min-w-[96px] md:min-w-[256px] mt-8 ml-auto"
                            onClick={() => setformStage(1)}
                        >
                            Next
                        </Button>
                    </div>
                )}

                {formStage === 1 && (
                    <div className="max-w-4xl mx-auto">
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
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
                                            {/* <RadioGroup
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
                                            </RadioGroup> */}
                                            {/* Use select */}
                                            <Select {...field}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your ID proof." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="PAN">
                                                        PAN
                                                    </SelectItem>
                                                    <SelectItem value="AADHAR">
                                                        AADHAR
                                                    </SelectItem>
                                                    <SelectItem value="VOTER ID">
                                                        VOTER ID
                                                    </SelectItem>
                                                    <SelectItem value="DRIVING LICENSE">
                                                        DRIVING LICENSE
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                            {/* Use select */}
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your education qualification." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="High School">
                                                        High School
                                                    </SelectItem>
                                                    <SelectItem value="Bachelor">
                                                        Bachelor
                                                    </SelectItem>
                                                    <SelectItem value="Master">
                                                        Master
                                                    </SelectItem>
                                                    <SelectItem value="PhD">
                                                        PhD
                                                    </SelectItem>
                                                    <SelectItem value="Other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your education qualification.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="profession"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profession</FormLabel>
                                        <FormControl>
                                            {/* Use select */}
                                            <Select {...field}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your profession." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Student">
                                                        Student
                                                    </SelectItem>
                                                    <SelectItem value="Employed">
                                                        Employed
                                                    </SelectItem>
                                                    <SelectItem value="Self-Employed">
                                                        Self-Employed
                                                    </SelectItem>
                                                    <SelectItem value="Unemployed">
                                                        Unemployed
                                                    </SelectItem>
                                                    <SelectItem value="Retired">
                                                        Retired
                                                    </SelectItem>
                                                    <SelectItem value="Other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                            {/* Use select */}
                                            <Select {...field}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your annual income." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="<20k">
                                                        {"<20k"}
                                                    </SelectItem>
                                                    <SelectItem value="20k-50k">
                                                        20k-50k
                                                    </SelectItem>
                                                    <SelectItem value="50k-100k">
                                                        50k-100k
                                                    </SelectItem>
                                                    <SelectItem value=">100k">
                                                        {">100k"}
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            Enter your annual income.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>
                        <section className="flex justify-between items-center">
                            <Button
                                variant="secondary"
                                className="min-w-[96px] md:min-w-[256px] mt-8 mr-auto"
                                onClick={() => setformStage(0)}
                            >
                                Back
                            </Button>
                            <Button
                                className="min-w-[96px] md:min-w-[256px] mt-8 ml-auto"
                                onClick={() => setformStage(2)}
                            >
                                Next
                            </Button>
                        </section>
                    </div>
                )}
                {formStage === 2 && (
                    <div className="max-w-4xl mx-auto">
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
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
                                            <Select {...field}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your share purpose." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Loan">
                                                        Loan
                                                    </SelectItem>
                                                    <SelectItem value="Deposit">
                                                        Deposit
                                                    </SelectItem>
                                                    <SelectItem value="Primary Applicant">
                                                        Primary Applicant
                                                    </SelectItem>
                                                    <SelectItem value="Co-Applicant">
                                                        Co-Applicant
                                                    </SelectItem>
                                                    <SelectItem value="Co-borrower">
                                                        Co-borrower
                                                    </SelectItem>
                                                    <SelectItem value="Surety">
                                                        Surety
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                            {/* Use select */}
                                            <Select {...field}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your no of shares." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1">
                                                        1
                                                    </SelectItem>
                                                    <SelectItem value="2">
                                                        2
                                                    </SelectItem>
                                                    <SelectItem value="3">
                                                        3
                                                    </SelectItem>
                                                    <SelectItem value="4">
                                                        4
                                                    </SelectItem>
                                                    <SelectItem value="5">
                                                        5
                                                    </SelectItem>
                                                    <SelectItem value="More">
                                                        More
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
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
                        </section>
                        <section className="flex justify-between items-center">
                            <Button
                                variant="secondary"
                                className="min-w-[96px] md:min-w-[256px] mt-8 mr-auto"
                                onClick={() => setformStage(1)}
                            >
                                Back
                            </Button>
                            <Button
                                className="min-w-[96px] md:min-w-[256px] mt-8 ml-auto"
                                onClick={() => setformStage(3)}
                            >
                                Next
                            </Button>
                        </section>
                    </div>
                )}
                {formStage === 3 && (
                    <div className="max-w-4xl mx-auto">
                        <section className="grid grid-cols-1 gap-12 md:pr-40 ">
                            <FormField
                                name="relationshipOfGroupMember"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Relationship of Group Member
                                        </FormLabel>
                                        <FormControl>
                                            <Select {...field}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your relationship of group member." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Parent">
                                                        Parent
                                                    </SelectItem>
                                                    <SelectItem value="Sibling">
                                                        Sibling
                                                    </SelectItem>
                                                    <SelectItem value="Spouse">
                                                        Spouse
                                                    </SelectItem>
                                                    <SelectItem value="Child">
                                                        Child
                                                    </SelectItem>
                                                    <SelectItem value="Other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                            <Select {...field}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your member position in bank." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Director">
                                                        Director
                                                    </SelectItem>
                                                    <SelectItem value="Committee">
                                                        Committee
                                                    </SelectItem>
                                                    <SelectItem value="Staff">
                                                        Staff
                                                    </SelectItem>
                                                    <SelectItem value="General">
                                                        General
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                className="min-w-[96px] md:min-w-[256px] mt-8 mr-auto"
                                onClick={() => setformStage(2)}
                            >
                                Back
                            </Button>
                            <Button
                                className="min-w-[96px] md:min-w-[256px] mt-8 ml-auto"
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
