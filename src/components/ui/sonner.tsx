import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';


const Toaster = (props: ToasterProps) => {
    return (
        <>
            <SonnerToaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: '25px',
                        padding: '12px 20px',
                        marginBottom: '10px',
                        maxWidth: '300px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                    duration: 3000,
                }}
                {...props}
            />
        </>
    );
};

export { Toaster };