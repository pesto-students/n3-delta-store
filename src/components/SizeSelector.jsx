import React from 'react'
import _ from 'lodash';
import { MenuItem, Typography, FormControl, Select } from '@material-ui/core';
import { translate } from '../resources/language/translate';

const SizeSelector = props => {

    const { product, handleChange, size } = props;

    let sizeOptionsEle = [];
    if (product.variant_groups && product.variant_groups.length) {
        const sizeOptions = _.find(product.variant_groups, { name: "Size" })
        if (sizeOptions && sizeOptions.options && sizeOptions.options.length) {
            sizeOptionsEle = _.map(sizeOptions.options, (option) => {
                return (<MenuItem value={option.id}>
                    {translate(option.name)}
                </MenuItem>)
            })
        }
    }
    return (
        <>
            {sizeOptionsEle && sizeOptionsEle.length ? (<div>

                <Typography variant="h5">{translate('Size')}:  <FormControl >
                    <Select
                        labelId="size-open-select-label"
                        id="size-open-select"
                        value={size}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            Select
                        </MenuItem>
                        {[sizeOptionsEle]}
                    </Select>
                </FormControl></Typography>

            </div>) : ""}
        </>
    )
}


export default SizeSelector
