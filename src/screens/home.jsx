import Slider from '../components/slider'
import img1 from '../assets/images/tags/one.png'
import img2 from '../assets/images/tags/two.jpg'
import img3 from '../assets/images/tags/three.png'
import img4 from '../assets/images/tags/four.png'
import img5 from '../assets/images/tags/five.png'
import img6 from '../assets/images/tags/six.jpg'

function ServiceList() {
    const list = [
        {
            id: 1,
            name: 'first',
            img: img1,
        },
        {
            id: 2,
            name: 'second',
            img: img2,
        },
        {
            id: 3,
            name: 'third',
            img: img3,
        },
        {
            id: 4,
            name: 'forth',
            img: img4,
        },
        {
            id: 5,
            name: 'fifth',
            img: img5,
        },
        {
            id: 6,
            name: 'sixth',
            img: img6,
        },
    ]

    return <ul className='p-0 mt-3 row w-75 w-md-50 mx-auto'>
        {list.map((item) => {
            return <div key={item.id} className='my-3 my-md-5 col-4 col-sm-2' >
                <div className='rounded-circle overflow-hidden'>
                    <img src={item.img} className='w-100 h-100' />
                </div>
                <div className='text-sm'>
                    {item.name}
                </div>
            </div>
        })}
    </ul>
}

function Home() {

    return <>
        <main className='w-100 min-vh-100'>
            <Slider />
            <div className='container-lg' >
                <ServiceList />
            </div>
        </main>
        <footer>
            this is footer
        </footer>
    </>
}

export { Home }