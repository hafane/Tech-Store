import { useForm } from "react-hook-form"
import { Brand } from "../../store/brandStore"
import ModalLayout from "../layouts/modalLayout"
import ButtonUI from "../ui/ButtonUI"
import InputTextUI from "../ui/InputTextUI"

type props = {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

type TForm = {
    name: string
}

const BrandAddModal = ({setIsModal}: props) => {
    const {handleSubmit, reset, formState: {errors}, register} = useForm<TForm>()

    const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsModal(false)
    }

    const onSubmit = (data: TForm) => {
        Brand.createNewBrand(data.name)
        reset()
    }

    return (
        <ModalLayout setIsModal={setIsModal} handleCloseModal={handleModal}>
            <div className="mb-4 text-2xl font-semibold text-center">
                <span>Добавить бренд</span>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} id="createBrand" method="POST">
                    <InputTextUI register={register("name", {required: true})} type="text" placeholder="Название" />
                    {errors.name && <span className="text-red-500">Поле обязательно</span>}
                </form>
                <ButtonUI className="mt-4 w-full py-2" form="createBrand" innerText="Добавить" role="button" type="submit" />
            </div>
        </ModalLayout>
    );
}

export default BrandAddModal;
