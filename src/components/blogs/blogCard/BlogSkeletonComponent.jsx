import SkBlogGrid from '@/components/widgets/skeletonLoader/blogSkeleton/SkBlogGrid';
import { Col, Row } from 'reactstrap';

const BlogSkeletonComponent = ({ queryBoxStyle }) => {
  const skeletonItems = Array.from({ length: 9 }, (_, index) => index);
  return (
    <Row className='g-4'>
      {skeletonItems?.map((elem, i) => (
        <Col
          xs={queryBoxStyle == 'list_view' && 12}
          xxl={queryBoxStyle !== 'list_view' && 4}
          sm={queryBoxStyle !== 'list_view' && 6}
          className={`${queryBoxStyle == 'list_view' ? 'list_view' : ''}`}
          key={i}>
          <SkBlogGrid />
        </Col>
      ))}
    </Row>
  );
};

export default BlogSkeletonComponent;
