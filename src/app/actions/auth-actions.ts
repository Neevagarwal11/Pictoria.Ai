'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation';


interface Authresponse {
    error: null | string,
    success: boolean,
    data: unknown |null;
}

export async function signup(formData: FormData): Promise<Authresponse>{
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    );

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options:{
            data:{
                full_name: formData.get('full_name') as string,
            }
        }
    }

        const {data : signupdata, error } = await (await supabase).auth.signUp(data)

        return{
            error: error?.message || "Error Sigining Up",
            success: !error,
            data: signupdata || null
        }


}


export async function login(formData: FormData): Promise<Authresponse>{
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    );

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
        const {data : signindata, error } = await (await supabase).auth.signInWithPassword(data)
     

        return{
            error: error?.message || "Error Loggin In",
            success: !error,
            data: signindata || null
        }

}

export async function logout(): Promise<void>{
    const supabase = await createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    );

    await supabase.auth.signOut();
    redirect('/login');
}