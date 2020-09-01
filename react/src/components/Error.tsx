import React from 'react'

import { connect } from 'react-redux'
import { RootState } from 'store/types'

type Props = { error: string | null }

const Error = (props: Props) =>
  props.error ? <div className="error">{props.error}</div> : null

const mapStateToProps = (state: RootState): Pick<Props, 'error'> => {
  const { error } = state
  return { error }
}

export default connect(mapStateToProps)(Error)
