#include <stdio.h>
#include <stdlib.h>

typedef struct Wektor
{
	int x,y;
}Wektor;

unsigned long long Silnia (int n)
{
	if(n == 0 ) return 1;
	else return Silnia(n-1)*n;
}



int main()
{
	int n;
	Wektor * nowy = (Wektor * )malloc(sizeof(Wektor));
	scanf("%d", &n );
	printf("%lld",Silnia(n));
	return 0;
}
