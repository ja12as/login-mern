import {z} from 'zod';

export const registerSchema = z.objectUtil({
    username: z.String({
        required_error: "Username is required",
    }),
    email: z.String({
        required_error: "Emmail is required",
    }).email({
        message: "Please enter a valid email address",
    }),
    password: z.string({
        required_error: 'Password is required',
    }).min(8, {
        message: "Password must be at   least 8 characters"
    })

    
});

export const loginSchema = z.object({
    email: z.String({
        required_error: "Emmail is required",
    }).email({
        message: "Please enter a valid email address",
    }),
    password: z.string({
        required_error: 'Password is required',
    }).min(8, {
        message: "Password must be at   least 8 characters"
    })
})