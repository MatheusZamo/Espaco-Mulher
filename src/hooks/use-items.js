import localforage from "localforage"
import { useState, useEffect, useCallback } from "react"

const useItems = () => {
  const [items, setItems] = useState([])
  const [orderBy, setOrderBy] = useState("newest")

  useEffect(() => {
    localforage
      .setItem("saveThings", items)
      .catch((error) => alert(error.message))
  }, [items])

  useEffect(() => {
    localforage
      .getItem("saveThings")
      .then((value) => {
        if (value) {
          setItems(value)
        }
      })
      .catch((error) => alert(error.message))
  }, [])

  const handleSubmitForm = useCallback(
    (newItem) => setItems((prev) => [...prev, newItem]),
    [],
  )

  const handleClickClearList = useCallback(() => setItems([]), [])

  const handleClickDelete = useCallback(
    (id) => setItems((i) => i.filter((item) => item.id !== id)),
    [],
  )

  const handleClickCheck = useCallback(
    (id) =>
      setItems((i) =>
        i.map((item) =>
          item.id === id ? { ...item, stored: !item.stored } : item,
        ),
      ),
    [],
  )

  const handleChangeOrder = useCallback((e) => setOrderBy(e.target.value), [])

  return {
    items,
    orderBy,
    handleSubmitForm,
    handleClickClearList,
    handleClickDelete,
    handleClickCheck,
    handleChangeOrder,
  }
}

export { useItems }
