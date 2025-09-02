import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { careerRepository } from '@/lib/repository/career'
import type { Career } from '@/types'
import { SEO } from '@/components/custom-ui/seo'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import supabase from '@/lib/supabase'
import { formApplySchema } from '@/lib/zod'

export const Route = createFileRoute('/career/apply/$id')({
    component: CareerApplyPage,
})

type FormValues = z.infer<typeof formApplySchema>

const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET

function CareerApplyPage() {
    const { id } = Route.useParams()
    const [career, setCareer] = useState<Career | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [cvFile, setCvFile] = useState<File | null>(null)

    // Initialize form
    const form = useForm<FormValues>({
        resolver: zodResolver(formApplySchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            // address: '',
            // education: '',
            // experience: '',
            // coverLetter: '',
            portfolioUrl: '',
        },
    })

    useEffect(() => {
        const fetchCareer = async () => {
            try {
                setLoading(true)
                const careerData = await careerRepository.findByUUID({ uuid: id })
                if (careerData) {
                    setCareer(careerData)
                } else {
                    setError('Career not found')
                }
            } catch (err) {
                console.error('Error fetching career:', err)
                setError('Failed to load career details')
            } finally {
                setLoading(false)
            }
        }

        fetchCareer()
    }, [id])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setCvFile(file)
            form.setValue('cv', file)
        }
    }

    const onSubmit = async (data: FormValues) => {
        try {
            setSubmitting(true)

            if (!cvFile) {
                // toast({
                //     title: 'Error',
                //     description: 'Please upload your CV',
                //     variant: 'destructive',
                // })
                toast("Error", { description: "Please upload your CV"});
                setSubmitting(false)
                return
            }

            const fileExt = cvFile.name.split('.').pop()
            const fileName = `${Date.now()}-${data.fullName.replace(/\s+/g, '-').toLowerCase()}.${fileExt}`
            const filePath = `career-applications/${fileName}`

            const { error: uploadError, data: _uploadData } = await supabase.storage
                .from(SUPABASE_BUCKET)
                .upload(filePath, cvFile)

            if (uploadError) {
                throw new Error(`Error uploading CV: ${uploadError.message}`)
            }

            const { data: { publicUrl } } = supabase.storage
                .from(SUPABASE_BUCKET)
                .getPublicUrl(filePath)

            const { error: insertError } = await supabase
                .from('career_applications')
                .insert([
                    {
                        career_id: id,
                        full_name: data.fullName,
                        email: data.email,
                        phone: data.phone,
                        // address: data.address,
                        // education: data.education,
                        // experience: data.experience,
                        // cover_letter: data.coverLetter,
                        portfolio_url: data.portfolioUrl || null,
                        cv_url: publicUrl,
                        status: 'Pending',
                    },
                ])

            if (insertError) {
                throw new Error(`Error submitting application: ${insertError.message}`)
            }

            // toast({
            //     title: 'Application Submitted',
            //     description: 'Your application has been submitted successfully!',
            // })
            
            toast("Application Submitted", { description: "Your application has been submitted successfully!" });

            setTimeout(() => {
                window.location.href = `/career/${id}`
            }, 2000)
        } catch (err) {
            console.error('Error submitting application:', err)
            // toast({
            //     title: 'Error',
            //     description: err instanceof Error ? err.message : 'Failed to submit application',
            //     variant: 'destructive',
            // })
            toast("Error", { description: err instanceof Error ? err.message : "Failed to submit application" });
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <Spinner className="h-8 w-8" />
                <span className="ml-2 text-lg">Loading application form...</span>
            </div>
        )
    }

    if (error || !career) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[80vh]">
                <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Career not found'}</h2>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        )
    }

    return (
        <>
            <SEO
                title={`Apply for ${career.title} - Indonesia Mitra Media Careers`}
                description={`Apply for the ${career.title} position at Indonesia Mitra Media`}
                keywords={`IMM, Indonesia Mitra Media, careers, application, ${career.title}, ${career.position}`}
                ogType="website"
                ogUrl={`/career/apply/${id}`}
                ogImage={career.image || "/assets/careers/imm.jpg"}
            />
            
            <div className="bg-gray-50 dark:bg-black min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-6">
                        <Button 
                            variant="ghost" 
                            className="text-blue-600 dark:text-blue-400 hover:bg-transparent hover:text-blue-800 p-0"
                            onClick={() => window.history.back()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to job details
                        </Button>
                    </div>
                    
                    <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <h1 className="text-3xl font-bold mb-2">Apply for {career.title}</h1>
                            <p className="text-gray-600 dark:text-gray-300 mb-8">
                                Complete the form below to apply for the {career.position} position
                            </p>
                            
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+62 812 3456 7890" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}

                                        
                                        {/* <FormField
                                            control={form.control}
                                            name="education"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Education</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Bachelor's in Computer Science" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}
                                    {/* </div> */}
                                    
                                    {/* <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Your full address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                    
                                    {/* <FormField
                                        control={form.control}
                                        name="experience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Work Experience</FormLabel>
                                                <FormControl>
                                                    <Textarea 
                                                        placeholder="Briefly describe your relevant work experience" 
                                                        className="min-h-[100px]"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                    
                                    {/* <FormField
                                        control={form.control}
                                        name="coverLetter"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cover Letter</FormLabel>
                                                <FormControl>
                                                    <Textarea 
                                                        placeholder="Tell us why you're interested in this position and why you'd be a good fit" 
                                                        className="min-h-[150px]"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                    
                                    <FormField
                                        control={form.control}
                                        name="portfolioUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Portfolio URL (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://yourportfolio.com" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    If you have a portfolio website or GitHub profile, please provide the URL
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="cv">CV/Resume (PDF, DOC, DOCX)</Label>
                                        <Input 
                                            id="cv" 
                                            type="file" 
                                            accept=".pdf,.doc,.docx" 
                                            onChange={handleFileChange}
                                            required
                                        />
                                        {form.formState.errors.cv && (
                                            <p className="text-sm font-medium text-red-500">
                                                {form.formState.errors.cv.message?.toString()}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Upload your CV or resume (max 5MB)
                                        </p>
                                    </div>
                                    
                                    <div className="flex justify-end pt-4">
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            className="mr-4"
                                            onClick={() => window.history.back()}
                                        >
                                            Cancel
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            disabled={submitting}
                                            className="min-w-[120px]"
                                        >
                                            {submitting ? (
                                                <>
                                                    <Spinner className="h-4 w-4 mr-2" />
                                                    Submitting...
                                                </>
                                            ) : 'Submit Application'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}