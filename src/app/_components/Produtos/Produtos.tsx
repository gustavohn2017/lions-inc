import React from 'react'

const Produtos = () => {
    const tabs = ["Tab1", "Tab2", "Tab3", "Tab4"];

    return (
        <section className='p-20'>
            <div>
                <h1>
                    Produtos
                </h1>
            </div>

            <div className='gap-4 grid grid-cols-4 '>
                {tabs.map((tab, index) => <button key={index} className='px-4 border py-3'>{tab}</button>)}
            </div>

        </section>


    )
}

export default Produtos