import {SignIn} from "@clerk/nextjs";

function SignInPage() {
    return (
        <main className={"flex items-center justify-center gap-2.5 cursor-pointer"}>
            <section className="">
                <SignIn />
            </section>
        </main>
    );
}

export default SignInPage;