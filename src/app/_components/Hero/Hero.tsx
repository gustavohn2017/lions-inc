export function Hero() {
    return (
        <section className="relative bg-gray-800 text-white h-64 md:h-96 mb-12">
            <img src="https://placehold.co/1200x400" alt="Banner Placeholder" className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center h-full px-4">
                <div className="md:w-1/2 flex flex-col justify-center h-full">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Lions Inc.</h1>
                    <p className="mb-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus dolorem totam ipsam velit ad eum modi, facere veniam voluptatum dolorum tempora perferendis. Alias consequatur sit corrupti optio praesentium, ipsam quia.</p>
                    <button className="bg-blend-color-burn text-white font-bold py-2 px-4 rounded">Conheça</button>
                </div>
                <div className="md:w-1/2 flex justify-end h-full mt-6 md:mt-0">
                    <img src="https://placehold.co/320x300" alt="Placeholder" className="w-1/2 md:w-auto md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2" />
                </div>
            </div>
        </section>
    );
}