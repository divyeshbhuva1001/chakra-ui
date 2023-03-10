import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Button, ChakraProvider, Checkbox, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import 'next-pagination/dist/index.css'
import { useState } from 'react'
import Pagination from "./pagination"
import '@etchteam/next-pagination/dist/index.css'
import Emoplees from './Emoplees.json'

const inter = Inter({ subsets: ['latin'] })
type FormData = {
  id: number | string;
  employee_name: string;
  date: string;
  label: string;
  link?: string
}

export default function Home() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [emopleesData, setEmopleesData] = useState(Emoplees?.data);
  const [showModal, setShowModal] = useState(false);
  // const emopleesData = emopleesData;
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked
  const [formData, setFormData] = useState<FormData>({
    id: "",
    employee_name: "",
    date: "",
    label: "",
    link: ""
  });
  const [id, setID] = useState<number>();
  const indexOfLastItem = pageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = emopleesData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const changePage = (pageNumber: any, event: any) => {
    event.preventDefault();
    setPageNumber(pageNumber);
  };

  const prevPage = (event: any) => {
    event.preventDefault();
    setPageNumber((prevState) => {
      return prevState > 1 ? prevState - 1 : prevState;
    });
  };

  const nextPage = (event: any) => {
    event.preventDefault();
    setPageNumber((prevState) => {
      return prevState < emopleesData.length / itemsPerPage
        ? prevState + 1
        : prevState;
    });
  };

  const handelDelete = (i: any) => {
    const filterData = emopleesData.filter((item) => item.id !== i).map((e) => e)
    setEmopleesData(filterData);
  }

  const handleCheckedAll = (e: any) => {
    if (e.target.checked) {
      setCheckedItems(currentItems.map((item: any) => item.id))
    } else {
      setCheckedItems([])
    }
  }

  const handleChangeSelect = (e: any) => {
    setCheckedItems((prev: any) => {
      if (prev.find((item: any) => item == e.target.value)) {
        return prev.filter((item: any) => item != e.target.value)
      } else {
        return [...prev, e.target.value]
      }
    })
  }
  const onClose = () => setShowModal(false);

  const handelEdit = (data: any) => {
    setShowModal(true);
    setID(data.id)
    setFormData(data)
  }

  const handelSubmit = (e: any) => {
    e.preventDefault();
    const updateData = emopleesData.map((item) => {
      if (item.id == id) {
        formData
      } else {
        item
      }
    })
    setShowModal(false);
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ChakraProvider>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>
                    <Checkbox
                      isIndeterminate={isIndeterminate}
                      onChange={handleCheckedAll}
                    />
                  </Th>
                  <Th>Title</Th>
                  <Th>Date</Th>
                  <Th>Label</Th>
                  <Th>Link</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  currentItems?.map((item: any, index: number) => (
                    <Tr key={index} className={checkedItems.find((i: number) => i == item.id) ? "active" : ''}>
                      <Td>
                        <Checkbox value={item.id} isChecked={checkedItems.find((i: number) => i == item.id) ? true : false} onChange={(e) => handleChangeSelect(e)} />
                      </Td>
                      <Td>{item.employee_name}</Td>
                      <Td>{item.date}</Td>
                      <Td>
                        <Tag>{item.label}</Tag>
                        <Tag colorScheme='cyan' ml={5}>{item.label} 2 </Tag>
                      </Td>
                      <Td><Link target={'_blank'} href={'https://www.google.com/'}>https://www.google.com/</Link></Td>
                      <Td>
                        <div>
                          <Button variant='ghost' size='sm' onClick={() => handelEdit(item)} ml={3}><EditIcon /></Button>
                          <Button variant='ghost' size='sm' onClick={() => handelDelete(item.id)}><DeleteIcon /></Button>
                        </div>
                      </Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
            <Pagination
              totalItems={emopleesData?.length}
              itemsPerPage={itemsPerPage}
              changePage={changePage}
              prevPage={prevPage}
              nextPage={nextPage}
              pageNumber={pageNumber}
            />
          </TableContainer>

          <Modal isOpen={showModal} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Data</ModalHeader>
              <ModalCloseButton />
              <form action="" onSubmit={handelSubmit}>
                <ModalBody>
                  <FormControl mb={4}>
                    <FormLabel>Title</FormLabel>
                    <Input type='text' name='employee_name' value={formData.employee_name} onChange={handleChange} />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Date</FormLabel>
                    <Input type='date' name='date' value={formData.date} onChange={handleChange} />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Label</FormLabel>
                    <Input type='text' name='label' value={formData.label} onChange={handleChange} />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Link</FormLabel>
                    <Input type='text' name='link' value={formData.link} onChange={handleChange} />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme='blue' type='submit' mr={3}>
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>

        </ChakraProvider>
      </main>
    </>
  )
}
