# 아이폰 스토리 웹앱 복구본

이 프로젝트는 전달받은 v0 내부 파일 덤프에서 앱 소스와 설정 파일을 분리한 복구본입니다.

## Vercel 배포
1. ZIP 압축을 풀고 GitHub 저장소에 파일과 폴더 구조를 그대로 업로드합니다.
2. Vercel에서 해당 저장소를 Import합니다. Framework Preset은 Next.js, Build Command는 `next build`, Install Command는 기본값을 사용합니다.
3. `public/photos/ssbwallpaper.jpg` 파일을 추가하세요. 원본 데이터가 이 경로를 사용합니다. 이미지가 없어도 앱은 열리지만 배경화면이 비어 보일 수 있습니다.

## 참고
- 원본 파일에 합쳐져 있던 소스를 추정된 경로로 분리했습니다. 아직 실제 빌드/브라우저 검증을 통과한 상태는 아닙니다.
- `data.ts`에서 폰 시간, 배경 이미지 경로, 메시지 등의 내용을 바꿀 수 있습니다.
