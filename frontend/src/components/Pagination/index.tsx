import React from 'react'

import './styles.css'

import rightArrowIcon from '../../assets/svgs/right_arrow.svg'
import leftArrowIcon from '../../assets/svgs/left_arrow.svg'

interface IPagination {
    totalDocs?: number
    limit?: number
    totalPages?: number
    page?: number
    pagingCounter?: number
    hasPrevPage?: boolean
    hasNextPage?: boolean
    prevPage?: number
    nextPage?: number
}

interface Props {
    pagination: IPagination
    setPagination: (value: React.SetStateAction<IPagination>) => void
}

const Pagination: React.FC<Props> = ({ pagination, setPagination }: Props) => {
  return (
    <div id="pagination">
      <button disabled={pagination.page === 1} onClick={() => {
        setPagination({ ...pagination, page: pagination.page! - 1 })
      }}>
        <img src={leftArrowIcon} alt=""/>
        <span>Anterior</span>
      </button>

      <button disabled={pagination.page === pagination.totalPages} onClick={() => {
        setPagination({ ...pagination, page: pagination.page! + 1 })
      }}>
        <span>Próxima</span>
        <img src={rightArrowIcon} alt=""/>
      </button>
    </div>
  )
}

export default Pagination
