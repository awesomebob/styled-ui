import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import ExpandedIcon from './svgs/expanded-icon.svg';
import CollapsedIcon from './svgs/collapsed-icon.svg';
import * as Styled from './styled-header';
import { useAccordionContext } from './accordion-util';

export function AccordionHeader({ children }) {
	const { focusedMenuItem, focusableChildList, hideArrows } = useAccordionContext();
	const headerId = useId();

	const ref = useRef();
	const selected = focusedMenuItem && focusedMenuItem === headerId;

	useEffect(
		() => {
			if (selected && ref.current) {
				ref.current.focus();
			}
		},
		[selected],
	);

	useEffect(
		() => {
			if (headerId) {
				focusableChildList.push(headerId);
			}
		},
		[headerId],
	);
	return (
		<Styled.AccordionHeader hideArrows={hideArrows} ref={ref}>
			<React.Fragment>
				{!hideArrows && (
					<div>
						<img
							src={focusedMenuItem === headerId ? ExpandedIcon : CollapsedIcon}
							role="presentation"
						/>
					</div>
				)}
				<div>{children}</div>
			</React.Fragment>
		</Styled.AccordionHeader>
	);
}

AccordionHeader.propTypes = {
	children: PropTypes.node,
};

AccordionHeader.isFocusableMenuChild = true;