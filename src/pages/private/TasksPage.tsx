import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button, Card, Skeleton, Typography } from '@heroui/react'
import type { TaskList } from '../../definitions/types.ts'
import { useCore } from '../../contexts/core/useCore.ts'
import taskListService from '../../services/task-list.service.ts'

function TasksPage() {
    const { coreId: coreIdParam } = useParams()

    const { coreId } = useCore()

    const [taskLists, setTaskLists] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const coreIdContext = Array.from(coreId)[0]

    useEffect(() => {
        if (coreIdContext || coreIdParam) {
            setIsLoading(true)
            taskListService
                .getTaskListsByCoreId(String(coreIdContext || coreIdParam))
                .then(({ data }) => {
                    setTaskLists(data)
                })
                .catch((error) => {
                    setTaskLists([])
                    console.error(error)
                })
                .finally(() => setIsLoading(false))
        }
        else {
            setTaskLists([])
        }
    }, [coreIdContext || coreIdParam])

    return (
        <article className='pt-2 flex flex-col justify-center items-center text-center lg:h-full'>
            <div className='w-full pb-2 sticky top-0 z-10 bg-background flex flex-col justify-center items-center text-center'>
                <div className='w-11/12 flex flex-row items-center lg:w-11/12 lg:flex-row lg:flex-wrap lg:justify-between'>
                    <div className='w-8/12 flex flex-col justify-start items-start text-start lg:w-1/4'>
                        <Typography type='h5' className='w-full'>Tareas</Typography>
                    </div>
                    <div className='w-4/12 lg:w-1/4 lg:h-8.25'>
                        <Button size='sm' className='min-h-7 h-full'>Crear Lista</Button>
                    </div>
                </div>
            </div>
            {
                isLoading
                    ?
                    <section className='w-full px-2 pt-4 flex flex-col justify-start items-start gap-2 lg:h-full lg:flex-row lg:overflow-y-auto'>
                        <Skeleton className='w-full h-96 rounded-3xl lg:w-2/5 lg:max-w-96 lg:shrink-0' />
                        <Skeleton className='w-full h-96 rounded-3xl lg:w-2/5 lg:max-w-96 lg:shrink-0' />
                        <Skeleton className='w-full h-96 rounded-3xl lg:w-2/5 lg:max-w-96 lg:shrink-0' />
                    </section>
                    :
                    taskLists.length > 0
                        ?
                        <section className='w-full px-2 pt-4 flex flex-col justify-start items-start gap-2 lg:h-full lg:flex-row lg:overflow-y-auto'>
                            {
                                taskLists.map((taskList: TaskList) => (
                                    <Card key={taskList.id} className='w-full max-h-96 lg:w-2/5 lg:max-w-96 lg:shrink-0'>
                                        <Typography type='h6' className='w-full'>{taskList.name}</Typography>
                                        <Typography type='body' className='w-full'>Tareas...</Typography>
                                    </Card>
                                ))
                            }
                        </section>
                        :
                        <section className='w-full px-2 pt-6 flex flex-col justify-center items-center gap-2 lg:h-full lg:flex-row lg:overflow-y-auto'>
                            <Typography>No hay ningun núcleo activo o lista disponible</Typography>
                        </section>
            }
            {/* <h1 className="text-7xl font-bold tracking-tight">
                Esta sera la TasksPage
            </h1>
            <section className='flex gap-3.5'>
                <Button
                    className='bg-accent hover:scale-110 hover:bg-accent transition-all'
                    onClick={() => console.log('Crear invitacion')}
                >
                    Crear Invitacion
                </Button>
                <Button
                    className='bg-accent scale-125 hover:scale-150 hover:bg-accent transition-all'
                    isIconOnly
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? <TbSunLowFilled /> : <TbMoonFilled />}
                </Button>
                <Button
                    className='bg-accent hover:scale-110 hover:bg-accent transition-all'
                    onClick={() => console.log('Cerrar sesion')}
                >
                    Cerrar sesion
                </Button>
            </section>
            <section className='w-full flex justify-center'>
                <TextField className="w-full max-w-80" defaultValue='invitacion' value={'inviteLink'} name="website">
                    <Label>Generar invitacion</Label>
                    <InputGroup>
                        <InputGroup.Prefix>
                            <Button className='active:bg-accent/75' isIconOnly aria-label="Copy" size="sm" variant="ghost" onClick={() => console.log('Crear invitacion')}>
                                <FaLink className="size-6" />
                            </Button>
                        </InputGroup.Prefix>
                        <InputGroup.Input className="w-full" disabled />
                        <InputGroup.Suffix className="pr-0">
                            <Popover>
                                <Button className='active:bg-accent/75' isIconOnly aria-label="Copy" size="sm" variant="ghost" isDisabled={true} onClick={() => console.log('Copiar enlace')}>
                                    <BiCopy className="size-6" />
                                </Button>
                                <Popover.Content placement="top">
                                    <Popover.Dialog>
                                        <Popover.Arrow />
                                        <p className="text-sm">¡Copiado!</p>
                                    </Popover.Dialog>
                                </Popover.Content>
                            </Popover>
                        </InputGroup.Suffix>
                    </InputGroup>
                    <ErrorMessage>{'No tienes ningun nucleo seleccionado o ha habido un error al crear la invitacion'}</ErrorMessage>
                </TextField>
            </section> */}
        </article>
    )
}

export default TasksPage
