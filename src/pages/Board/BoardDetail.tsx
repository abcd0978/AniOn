import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// components
import Comments from '../../components/Board/Comments';
import ScrollToTop from '../../components/Scroll/ScrollToTop';
import EditorComponent from '../../components/Editor/EditorComponent';
import ProfileWithBorder, {
  processItem,
} from '../../components/ProfileWithBorder';
import Loading from '../../components/Loading/Loading';

// style
import { S } from './boardDetail.styles';

//hooks
import { useConfirm } from '../../hooks/useConfirm';
import useViewport from '../../hooks/useViewPort';

// api
import * as boardApi from '../../api/board';

// store
import * as userStore from '../../store/userStore';

// types
import type { UpdatePost } from '../../types/post';

const BoardDetail = () => {
  const user = useAtomValue(userStore.user);
  const { post_id } = useParams<{ post_id: string }>();

  const { width } = useViewport();
  const { isMobile } = useViewport();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { openConfirm } = useConfirm();

  // 수정 여부 및 수정 입력값 받기
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [editCategory, setEditCategory] = useState<string>('');

  const handleWriteClick = () => {
    if (!user) {
      toast.warning('로그인 후에 작성할 수 있습니다! 로그인 해주세요😳', {
        autoClose: 800,
      });
    } else {
      navigate('/board/write');
    }
  };

  const postQueryOptions = {
    queryKey: ['post'],
    queryFn: () => boardApi.fetchPost(post_id!),
    refetchOnFocus: false,
  };

  // Post 상세조회
  const { data: post } = useQuery(postQueryOptions);

  //전에 좋아요를 눌렀는지 확인
  const likeQueryOption = {
    queryKey: ['like'],
    queryFn: () => boardApi.fetchLikeForPost({ post_id, user_id: user?.id }),
    enabled: !!user,
    refetchOnWindowFocus: false,
  };
  const { data: like } = useQuery(likeQueryOption);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (post && !isEdit) {
      // 수정 중이 아닐 때만 게시물 정보 업데이트
      setTitle(post.title);
      setContent(post.content);
      setEditCategory(post.category);
    }
  }, [isEdit, post]);

  // Post 삭제
  const deleteMutation = useMutation(boardApi.deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const deleteButton = (id: string) => {
    const delteConfirmData = {
      title: '게시글 삭제',
      content: '정말 삭제하실건가요??',
      callback: () => {
        deleteMutation.mutate(id);
        toast.success('삭제되었습니다!', {
          autoClose: 800,
        });
        navigate('/board');
      },
    };

    openConfirm(delteConfirmData);
  };

  // Post 수정
  const updateMutation = useMutation(boardApi.updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
      queryClient.invalidateQueries(['posts']);
      setIsEdit(false);
    },
  });

  const getImg = (bodyStr: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(bodyStr, 'text/html');
    const img = doc.querySelector<HTMLImageElement>('img[src]');
    const src = img?.src;
    return src ? src : null;
  };

  const editButton = (post: UpdatePost) => {
    if (!isEdit) {
      setTitle(post.title);
      setContent(post.content);
      setEditCategory(post.category || '');
    } else {
      const editPost = {
        ...post,
        title,
        content,
        category: editCategory,
        thumbnail: getImg(content),
      };
      updateMutation.mutate(editPost);
    }
    setIsEdit(!isEdit);
  };

  const insertLikeMutation = useMutation(boardApi.createLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['like']);
      queryClient.invalidateQueries(['posts']);
    },
  });

  const deleteLikeMutation = useMutation(boardApi.deleteLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['like']);
      queryClient.invalidateQueries(['posts']);
    },
  });

  //좋아요
  const toggleLike = async () => {
    if (!user) {
      toast.warning('로그인이 필요한 서비스입니다😳', {
        autoClose: 800,
      });
      return;
    }

    // mutation 추가
    if (like?.length !== 0) {
      if (!like) {
        return;
      }
      deleteLikeMutation.mutate(like[0].id);
    } else {
      insertLikeMutation.mutate({ post_id: post_id!, user_id: user.id });
    }
  };

  const handleListClick = () => {
    navigate('/board');
  };

  return (
    <>
      <S.TopTitle>게시판</S.TopTitle>
      {!isEdit && (
        <S.Post>
          <S.Search>
            {!isMobile && (
              <S.CateButton
                style={{
                  backgroundColor: '#FF96DB',
                  color: '#ffffff',
                }}
              >
                {post?.category}
              </S.CateButton>
            )}
          </S.Search>
          <S.Write>
            {!isMobile && (
              <S.WriteButton onClick={handleWriteClick}>
                <img src="/images/pencil.svg" alt="작성" /> 작성하기
              </S.WriteButton>
            )}
          </S.Write>
        </S.Post>
      )}
      <S.Container>
        <S.Inner>
          {post ? (
            <>
              {user?.id === post.user_id && (
                <S.ButtonContainer>
                  <S.Button
                    onClick={() => {
                      if (isEdit) {
                        editButton(post);
                      } else {
                        deleteButton(post.id!);
                      }
                    }}
                    style={{
                      backgroundColor: isEdit ? '#dddddd' : '#dddddd',
                      color: isEdit ? 'black' : 'black',
                    }}
                  >
                    {isEdit ? '취소' : '삭제'}
                  </S.Button>
                  <S.Button
                    onClick={() => editButton(post)}
                    style={{
                      backgroundColor: isEdit ? '#8200FF' : '#dddddd',
                      color: isEdit ? 'white' : 'black',
                    }}
                  >
                    {isEdit ? '저장' : '수정'}
                  </S.Button>
                </S.ButtonContainer>
              )}

              <S.PostContainer key={post.id}>
                {isEdit ? (
                  <S.Box>
                    <S.Select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      <option value="애니">애니</option>
                      <option value="자유">자유</option>
                      <option value="오류 신고">오류 신고</option>
                    </S.Select>
                  </S.Box>
                ) : (
                  <S.Category></S.Category>
                )}
                {isEdit ? (
                  <S.Box>
                    <S.Input value={title} onChange={onChangeTitle} />
                  </S.Box>
                ) : (
                  <>
                    <S.Top>
                      <S.Title>{title}</S.Title>
                      <S.Date>
                        {new Date(post.created_at).toLocaleDateString()}
                      </S.Date>
                    </S.Top>

                    <S.User>
                      <S.UserInfo>
                        <ProfileWithBorder
                          width={90}
                          $mediawidth={1920}
                          border_img_url={
                            post.users.inventory.length > 0
                              ? processItem(post.users.inventory).border
                              : undefined
                          }
                          profile_img_url={post.users?.profile_img_url}
                          key={post.id!}
                        />
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <div style={{ paddingTop: '12.5%' }}>
                            <S.Nickname>{post.users?.nickname}</S.Nickname>
                            {post.users.inventory.length > 0 &&
                            processItem(post.users.inventory).award.img_url ? (
                              <img
                                src={
                                  processItem(post.users.inventory).award
                                    .img_url!
                                }
                                alt={
                                  processItem(post.users.inventory).award.name!
                                }
                                style={{ width: '', height: '32px' }}
                              />
                            ) : (
                              <S.AwardNo>칭호없음</S.AwardNo>
                            )}
                          </div>
                        </div>
                      </S.UserInfo>
                      <S.Like onClick={toggleLike}>
                        {like?.length ? (
                          <S.Img src="/images/filledLike.svg" alt="좋아요" />
                        ) : (
                          <S.Img
                            src="/images/borderLike.svg"
                            alt="좋아요 취소"
                          />
                        )}
                      </S.Like>
                    </S.User>
                  </>
                )}

                {!isEdit && <S.Line />}

                {isEdit ? (
                  <S.EditBox>
                    <EditorComponent value={content} onChange={setContent} />
                  </S.EditBox>
                ) : (
                  <S.Content
                    width={width}
                    id="post-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></S.Content>
                )}
              </S.PostContainer>

              <S.Comment>{!isEdit && <Comments />}</S.Comment>
            </>
          ) : (
            <Loading />
          )}
          <ScrollToTop />
        </S.Inner>
      </S.Container>
      <S.ListButton onClick={handleListClick}>목록</S.ListButton>
    </>
  );
};

export default BoardDetail;
