import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
  const PriceElement = variant === 'on-sale'
  ? PriceSale
  : Price;
 
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag> }
          {variant === 'new-release' && <NewFlag>Just released!</NewFlag> }
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceElement>{formatPrice(price)}</PriceElement>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
    
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
  display:block;
  width:100%;
`;

const Flag = styled.div`
  background:var(--background);
  font-size:${14/16}rem;
  font-weight:${WEIGHTS.bold};
  color: white;
  padding:0 10px;
  height:32px;
  line-height:32px;
  border-radius:2px;
  position:absolute;
  right:-4px;
  top:12px;
`

const SaleFlag = styled(Flag)`
  background:${COLORS.primary}
`
const NewFlag = styled(Flag)`
  background:${COLORS.secondary}
`

const Row = styled.div`
  font-size: 1rem;
  display:flex;
  flex-wrap:wrap;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;
const PriceSale = styled.span`
  color: ${COLORS.gray[700]};
  text-decoration: line-through;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;


const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
