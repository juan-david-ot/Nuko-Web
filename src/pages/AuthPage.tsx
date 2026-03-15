import { Tabs } from '@heroui/react'
import LogInForm from '../components/Forms/LogInForm'
import SignUpForm from '../components/Forms/SignUpForm'

function AuthPage() {

    return (
        <article className='h-full flex justify-center items-start pt-20 lg:items-start lg:pt-40'>
            <div className="flex flex-col items-center justify-center rounded-4xl bg-surface p-6">
                <Tabs className="w-fit max-w-md">
                    <Tabs.ListContainer>
                        <Tabs.List
                            className='w-full backdrop-blur-xl bg-background/70 border border-white/10'
                            aria-label="Auth"
                        >
                            <Tabs.Tab id="logIn">
                                Iniciar Sesion
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="signUp">
                                Registrarse
                                <Tabs.Indicator />
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs.ListContainer>
                    <Tabs.Panel className="pt-4" id="logIn">
                        <LogInForm />
                    </Tabs.Panel>
                    <Tabs.Panel className="pt-4" id="signUp">
                        <SignUpForm />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </article>
    )
}

export default AuthPage
