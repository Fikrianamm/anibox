## API

### Base URL
```
https://animeapi-askiahnur1.b4a.run
```

### Endpoints
**Get Trending**
```
/anime?sort=trending
```
**Get Popular**
```
/anime?sort=popularity
```
**Get New Release**
```
/anime?sort=newest
```
**Get Top N**
```
/anime?sort=top
```
**Get Detail By ID**
```
/anime/:id
```
**Search**
```
/anime?title=attack
```
**Pagination**
```
/anime?sort=top&limit=50&page=2
/anime?title=attack&limit=20&page=1
```
- Max limit per page: 50
