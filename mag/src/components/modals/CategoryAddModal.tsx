import { useForm } from 'react-hook-form'
import ModalLayout from '../layouts/modalLayout'
import ButtonUI from '../ui/ButtonUI'
import InputTextUI from '../ui/InputTextUI'
import { Category } from '../../store/categoryStore'

type props = {
    setIdModal: React.Dispatch<React.SetStateAction<boolean>>
}

type TForm = {
    name: string
}

const CategoryAddModal = ({setIdModal}: props) => {
    const {handleSubmit, reset, formState: {errors}, register} = useForm<TForm>()

    const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIdModal(false)
    }

    const onSubmit = (data: TForm) => {
        Category.createOneCategory(data.name)
        reset()
    }

    return (
        <ModalLayout setIsModal={setIdModal} handleCloseModal={handleModal}>
            <div className="mb-4 text-2xl font-semibold text-center">
                <span>Добавить категорию</span>
            </div>
            <div>
                <form id='createCategory' onSubmit={handleSubmit(onSubmit)} method='POST'>
                    <InputTextUI register={register('name', {required: true})} placeholder='Название' type='text' />
                    {errors.name && <span className='text-red-500'>Поле обязательно</span>}
                </form>
                <ButtonUI form='createCategory' className='mt-4 w-full py-2' innerText='Добавить' type='submit' />
            </div>
        </ModalLayout>
    );
}

export default CategoryAddModal;
