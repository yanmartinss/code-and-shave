import VisibilityIcon from '@mui/icons-material/Visibility';

export const Login = () => {
    return (
        <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
                alt=""
                src="https://c.pxhere.com/photos/78/6b/barber_shop_chair_barber_shop_haircut_hairdresser_beard_barbershop-1062111.jpg!d"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
                <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
                </a>

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Code & Shave 💈
                </h2>

                <p className="mt-4 leading-relaxed text-white/90">
                Sistema de agendamento fácil e rápido para barbearias e clientes.
                </p>
            </div>
            </section>

            <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
            <div className="max-w-xl lg:max-w-3xl">
                <div className="relative -mt-16 block lg:hidden">

                <h1 className="mt-12 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Code & Shave
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                    Sistema de agendamento fácil e rápido para barbearias e clientes.
                </p>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                    <h1 className="text-black font-bold text-2xl">Login</h1>

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-500">Email</label>
                        <input 
                        type="email"
                        className="p-1 outline-none text-gray-500 shadow-sm" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-500">Senha</label>
                        <div>
                            <input
                            type="password"
                            className="p-1 outline-none text-gray-500 shadow-sm" />
                            <VisibilityIcon />
                        </div>
                    </div>
                </div>
            </div>
            </main>
        </div>
        </section>
    );
}