import React from 'react'
import Downshift from 'downshift'
import { TextField, Paper, Chip, MenuItem } from '@material-ui/core'

const Multiselect = ({ options, callout, value }) => {
  const [inputValue, setInputValue] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState(value || [])

  function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            input: 'chip-text-input'
          },
          ...InputProps
        }}
        {...other}
      />
    )
  }

  function renderOption(optionProps) {
    const {
      option,
      index,
      itemProps,
      highlightedIndex,
      selectedItem
    } = optionProps
    const isHighlighted = highlightedIndex === index
    const isSelected = (selectedItem || '').indexOf(option.name) > -1

    return (
      <MenuItem
        {...itemProps}
        key={option.name}
        selected={isHighlighted}
        component='div'
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {option.name}
      </MenuItem>
    )
  }

  function handleKeyDown(event) {
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }

  function handleChange(item) {
    let newSelectedItem = [...selectedItem]
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item]
    }
    setInputValue('')
    setSelectedItem(newSelectedItem)
    callout(findBreedObj(newSelectedItem))
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem]
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
    setSelectedItem(newSelectedItem)
    callout(findBreedObj(newSelectedItem))
  }

  const findBreedObj = items => {
    return options.filter(o => {
      for (let i = 0; i < items.length; i++) {
        if (o.name === items[i]) {
          return o
        }
      }
      return null
    })
  }

  function getOptions(value, showEmpty) {
    const inputValue = value.toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0 && !showEmpty
      ? []
      : options.filter(option => {
          return option.name.slice(0, inputLength).toLowerCase() === inputValue
        })
  }

  return (
    <Downshift
      id='downshift-multiple'
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex,
        openMenu
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown
        })

        return (
          <div className='chip-select'>
            {renderInput({
              fullWidth: true,
              label: 'Breeds',
              InputLabelProps: getLabelProps({
                shrink: isOpen || selectedItem.length > 0
              }),
              InputProps: {
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={'chip'}
                    onDelete={handleDelete(item)}
                  />
                )),
                onBlur,
                onChange: event => {
                  handleInputChange(event)
                  onChange(event)
                },
                onFocus: openMenu,
                onClick: openMenu
              },
              inputProps
            })}

            {isOpen ? (
              <Paper square className='multiselect-dropdown'>
                {getOptions(inputValue, true).map((option, index) =>
                  renderOption({
                    option,
                    index,
                    itemProps: getItemProps({ item: option.name }),
                    highlightedIndex,
                    selectedItem: selectedItem2
                  })
                )}
              </Paper>
            ) : null}
          </div>
        )
      }}
    </Downshift>
  )
}

export default Multiselect
